import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Header from './Header';
import {Button, FlatList, Input} from 'native-base';
import {useToast} from 'react-native-toast-notifications';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const Payment = ({route, navigation}) => {
  const toast = useToast();
  const [disable, setDisable] = useState(false);
  const [disablePlaceOrder, setDisablePlaceOrder] = useState(false);
  const {data} = route.params;
  const [paymentDetails, setPaymentDetails] = useState(data);
  const [showSuccess, setShowSuccess] = useState(false);

  const placeOrder = async () => {
    setDisablePlaceOrder(true);

    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/cart/order/',
        {paymentMethod: 'PAID'},
        config(token),
      );
      if (response.data.message === 'Order placed successfully') {
        toast.show(`${response.data.message}`, {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });

        setDisablePlaceOrder(false);
        setTimeout(() => {
          navigation.navigate('OrderSuccess', {data: response.data});
        }, 1000);
      }

      if (response.data.message === 'No cart found') {
        navigation.navigate('DrawerNav');
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
      if (err.message === 'Network Error') {
      }
    }
  };

  const handlePayment = async () => {
    setDisable(true);
    try {
      const res = await axios.post(`${base_url}/payment/status`, {
        invoice_id: data.invoice.invoice_id,
      });
      setPaymentDetails(res.data);

      if (res.data.invoice.failed_reason === 'Request cancelled by user') {
        toast.show(`${res.data.invoice.failed_reason}, please retry again`, {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
      }

      if (
        res.data.invoice.failed_reason ===
        'The balance is insufficient for the transaction.'
      ) {
        toast.show(`${res.data.invoice.failed_reason}`, {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
      }

      if (res.data.invoice.state === 'PROCESSING') {
        toast.show(`Processing`, {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
      }

      if (res.data.invoice.state === 'RETRY') {
        toast.show(
          `${res.data.invoice.failed_reason} or go back and try again. We have sent paybil and account number via sms to complete the transaction`,
          {
            type: 'danger',
            placement: 'top',
            duration: 15000,
            offset: 30,
            animationType: 'slide-in',
          },
        );
        setDisable(false);
      }

      if (res.data.invoice.state === 'COMPLETE') {
        toast.show(`Transaction complete`, {
          type: 'success',
          placement: 'top',
          duration: 1000,
          offset: 30,
          animationType: 'slide-in',
        });
        setDisable(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 2500);

        setTimeout(() => {
          placeOrder();
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Header title="Payment" navigation={navigation} />

      <View className="px-2 bg-white mt-[1px] p-3 flex space-y-4">
        <Text
          className="text-black text-[17px] font-bold"
          style={styles.customFont}>
          Payment Details
        </Text>
        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Account
          </Text>
          <Text className="text-black">{paymentDetails.invoice.account}</Text>
        </View>
        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Payment Amount
          </Text>
          <Text className="text-black">
            {paymentDetails.invoice.net_amount.toLocaleString()}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Currency
          </Text>
          <Text className="text-black">{paymentDetails.invoice.currency}</Text>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Status
          </Text>
          <Text className="text-black">{paymentDetails.invoice.state}</Text>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Provider
          </Text>
          <Text className="text-black">{paymentDetails.invoice.provider}</Text>
        </View>
        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Charges
          </Text>
          <Text className="text-black">{paymentDetails.invoice.charges}</Text>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Invoice_id
          </Text>
          <Text className="text-black">
            {paymentDetails.invoice.invoice_id}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Failed_reason
          </Text>
          <Text className="text-black">
            {paymentDetails.invoice.failed_reason === null
              ? 'N/A'
              : paymentDetails.invoice.failed_reason}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between ">
          <Text className="text-black text-[16px]" style={styles.customFont}>
            Customer_id
          </Text>
          <Text className="text-black">{data.customer.customer_id}</Text>
        </View>
      </View>
      <View className="p-4 bg-white mt-[20px]">
        <Text
          className="text-black text-[17px]  font-bold"
          style={styles.customFont}>
          Mpesa payment
        </Text>
        <View>
          <Text className="text-black text-[13px]">
            If your Order is already been paid but not reflected, please allow
            2hours for us to confirm the order. Any questions please contact us.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            handlePayment();
          }}
          className="py-3">
          <Button
            mt={2}
            className="bg-blue-900 text-white"
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
                  I have paid
                </Text>
              )}
            </View>
          </Button>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        className="p-4">
        <Button
          mt={2}
          className="bg-white text-white"
          style={styles.customFont}
          variant={'outline'}
          color={'yellow.500'}
          borderColor={'blue.900'}
          disabled={true}>
          <View>
            <Text
              style={styles.customFont}
              className="text-black font-bold text-[16px]">
              Other online payments
            </Text>
          </View>
        </Button>
      </TouchableOpacity>

      <View className="p-2">
        <FastImage
          source={{
            uri: 'https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-no-mpesa-hr-light.png',
          }}
          className="w-[120px h-[100px]"
          resizeMode="contain"
        />
        <Text
          className="text-black text-center font-bold"
          style={styles.customFont}>
          Secured by IntaSend Payments
        </Text>
      </View>

      {showSuccess && (
        <View
          className={`absolute top-[15%] left-[30%]
    `}>
          <LottieView
            source={require('../../assets/success.json')}
            autoPlay
            loop
            width={150}
            height={150}
          />
        </View>
      )}

      {disablePlaceOrder && (
        <View
          className={`absolute top-[28%] left-[34%]
    `}>
          <LottieView
            source={require('../../assets/loader1.json')}
            autoPlay
            loop
            width={150}
            height={150}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default Payment;
