import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  View,
  Text,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {icons} from '../../constants';
import FastImage from 'react-native-fast-image';
import {Button, FlatList, Input} from 'native-base';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const PlaceOrderModal = ({
  setModalVisible,
  modalVisible,
  friendPay,
  navigation,
  amount,
}) => {
  const {width, height} = Dimensions.get('window');
  const toast = useToast();
  const [disable, setDisable] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryCode, setCountryCode] = useState('US');

  console.log(friendPay);

  const onSelect = country => {
    setCountryCode(country.cca2);
  };
  const handlePhoneNumberChange = value => {
    setPhoneNumber(value);
    if (value.trim() === '') {
      setPhoneNumberError('Phone number is required!');
    } else if (!/^(0|7)[0-9]{8}$/.test(value)) {
      setPhoneNumberError('Phone number is invalid!');
    } else {
      setPhoneNumberError('');
    }
  };

  const paymentData = {
    phone_number: `254${phoneNumber}`,
    amount,
  };

  //   console.log(paymentData);

  const handlePayment = async () => {
    if (phoneNumberError.length > 0) {
      return toast.show(`${phoneNumberError}`, {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
    if (phoneNumber.length < 1) {
      return toast.show(`Enter your phone number!`, {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }

    try {
      setDisable(true);

      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.post(`/payment`, paymentData);

      if (res.data.invoice.state === 'PENDING') {
        friendPay
          ? toast.show(
              'Please notify your Friend enter Mpesa pin to complete purchase',
              {
                type: 'success',
                placement: 'top',
                duration: 5000,
                offset: 30,
                animationType: 'zoom-in',
              },
            )
          : toast.show('Please enter Mpesa pin to complete purchase', {
              type: 'success',
              placement: 'top',
              duration: 5000,
              offset: 30,
              animationType: 'zoom-in',
            });
        setDisable(false);
        setModalVisible(false);
        navigation.navigate('Payment', {data: res.data});
      }
      console.log(res.data);

      //   setTimeout(() => {
      //     navigation.goBack();
      //   }, 1500);
    } catch (err) {}
  };

  //animation
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (modalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [modalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 100, height - 370],
  });

  return (
    <Modal transparent={true} visible={modalVisible} animationType="fade">
      <View
        className="bg-white flex-1"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
        {/* transparent background */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View className="absolute top-0 left-0 right-0 bottom-0 " />
        </TouchableWithoutFeedback>
        {/* animated pushup */}
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '80%',
            padding: 8,
            backgroundColor: 'white',
          }}>
          <View className="flex flex-row space-x-3 justify-center my-2"></View>
          <View>
            <Input
              placeholder="791033018"
              onChangeText={handlePhoneNumberChange}
              value={phoneNumber}
              keyboardType="numeric"
              returnKeyType="done"
              borderColor="green.600"
              className="text-black text-[14px]"
              InputLeftElement={
                <View>
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCountryNameButton={false} // Set withCountryNameButton to false
                    withAlphaFilter
                    withCallingCode={true}
                    withEmoji
                    onSelect={onSelect}
                    visible={false}
                    renderFlagButton={() => (
                      <View className="flex flex-row items-center ml-[5px]">
                        <FlagButton countryCode="KE" withEmoji />
                        <Text className="text-green-600 font-semibold">
                          +254
                        </Text>
                      </View>
                    )}
                  />
                </View>
              }
            />
            <TouchableOpacity
              onPress={() => {
                handlePayment();
              }}>
              <Button
                mt={4}
                className="bg-green-500 text-white"
                style={styles.customFont}
                disabled={true}>
                <View>
                  {disable ? (
                    <View className="bg-red-500 h-[20px] relative left-[-50px] top-[-14px] ">
                      <LottieView
                        source={require('../../assets/dots.json')}
                        autoPlay
                        loop
                        width={100}
                        height={50}
                      />
                    </View>
                  ) : (
                    <Text
                      style={styles.customFont}
                      className="text-white font-bold text-[16px]">
                      Pay now
                    </Text>
                  )}
                </View>
              </Button>
            </TouchableOpacity>

            <View className="p-2 mt-8">
              <FastImage
                source={{
                  uri: 'https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-no-mpesa-hr-light.png',
                }}
                className="w-[120px h-[100px]"
                resizeMode="contain"
              />
              <Text
                className="text-black text-center font-semibold"
                style={styles.customFont}>
                Secured by IntaSend Payments
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default PlaceOrderModal;
