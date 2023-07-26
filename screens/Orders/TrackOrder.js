import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../checkout/Header';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {base_url} from '../../utils/baseUrl';
import LottieView from 'lottie-react-native';
import StepIndicator from 'react-native-step-indicator';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {Rating} from 'react-native-ratings';

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const TrackOrder = ({route, navigation}) => {
  const {id} = route.params;
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState([]);
  const [step, setStep] = useState(1);

  const getOrder = async () => {
    setDisable(true);

    try {
      const res = await axios.get(`${base_url}user/orders/${id}`);
      console.log(res.data);
      setData(res.data);
      res.data.orderStatus === 'Delivered'
        ? setStep(4)
        : res.data.orderStatus === 'Processing'
        ? setStep(2)
        : res.data.orderStatus === 'Dispatched'
        ? setStep(3)
        : null;
      setDisable(false);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrder();

      return () => {};
    }, []),
  );
  const date = new Date(data.createdAt);
  const options = {weekday: 'short', day: 'numeric', month: 'short'};
  const formattedDate = date.toLocaleDateString('en-US', options);

  const date2 = new Date(data.updatedAt);
  const formattedDate2 = date2.toLocaleDateString('en-US', options);

  const labels = [
    <View className="flex flex-row items-center space-x-2 w-[60vw]">
      <FastImage source={icons.orderPlaced} className="w-[30px] h-[30px]" />
      <View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black font-bold" style={styles.customFont}>
            Order Placed
          </Text>
          <Text className="text-black">({formattedDate})</Text>
        </View>
        <Text className="text-gray-500 text-[13px] ">
          We have received and confirmed your order
        </Text>
      </View>
    </View>,
    <View className="flex flex-row items-center space-x-2 w-[60vw]">
      <FastImage source={icons.paid} className="w-[30px] h-[30px]" />
      <View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black font-bold" style={styles.customFont}>
            Payment Confirmed
          </Text>
          <Text className="text-black">({formattedDate})</Text>
        </View>
        <Text className="text-gray-500 text-[13px] ">
          {data.paymentIntent?.method === 'COD'
            ? 'Payment will be made upon order delivery.'
            : 'Payment for your order has been received.'}
        </Text>
      </View>
    </View>,
    <View className="flex flex-row items-center space-x-2 w-[60vw]">
      <FastImage source={icons.orderProcessed} className="w-[30px] h-[30px]" />
      <View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black font-bold" style={styles.customFont}>
            Order Processed
          </Text>
        </View>
        <Text className="text-gray-500 text-[13px] ">
          Your order has been processed and will be Dispatched soon. Thank you
          for choosing us.
        </Text>
      </View>
    </View>,
    <View className="flex flex-row items-center space-x-2 w-[60vw]">
      <FastImage source={icons.shipped2} className="w-[30px] h-[30px]" />
      <View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black font-bold" style={styles.customFont}>
            Dispatched for delivery
          </Text>
        </View>
        <Text className="text-gray-500 text-[13px] ">
          Your order has been dispatched for delivery. We appreciate your
          business and hope you enjoy your purchase
        </Text>
      </View>
    </View>,
    <View className="flex flex-row items-center space-x-2 w-[60vw]">
      <FastImage
        source={icons.cash_on_delivery}
        className="w-[35px] h-[35px]"
      />
      <View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black font-bold" style={styles.customFont}>
            Order Delivered
          </Text>
          {data.orderStatus === 'Delivered' ? (
            <Text className="text-black">({formattedDate2})</Text>
          ) : null}
        </View>
        <Text className="text-gray-500 text-[13px] ">
          Your order has been successfully delivered. We hope you are satisfied
          with your purchase. Thank you for choosing our services.
        </Text>
      </View>
    </View>,
    <View className="flex flex-row items-center space-x-2 w-[60vw]">
      <FastImage
        source={icons.cash_on_delivery}
        className="w-[35px] h-[35px]"
      />
      <View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black font-bold" style={styles.customFont}>
            Order Pickup Confirmation
          </Text>
          {data.orderStatus === 'Delivered' ? (
            <Text className="text-black">({formattedDate2})</Text>
          ) : null}
        </View>
        <Text className="text-gray-500 text-[13px] ">
          Confirmation of the customer's signature for successful order pickup
          has been received. We sincerely appreciate your cooperation and
          patronage.
        </Text>
      </View>
    </View>,
  ];

  return (
    <View className="flex-1">
      <Header navigation={navigation} title="Track Order" />

      {disable ? (
        <View
          className={`absolute top-[37%] left-[34%] 
                `}>
          <LottieView
            source={require('../../assets/loader1.json')}
            autoPlay
            loop
            width={150}
            height={150}
          />
        </View>
      ) : (
        <>
          <View className="p-4 flex space-y-1 bg-white">
            <View className="flex flex-row justify-between items-center space-x-1">
              <View className="flex flex-row items-center space-x-1">
                <Text
                  className="text-black text-[17px] font-bold"
                  style={styles.customFont}>
                  Order Id:
                </Text>
                <Text className="text-black text-[13px]">{id}</Text>
              </View>
              <View className="flex flex-row space-x-1 items-center">
                <Text
                  className="text-black text-[17px] font-bold"
                  style={styles.customFont}>
                  Amt:
                </Text>
                <Text className="text-black text-[13px]">
                  Ksh {data.paymentIntent?.amount.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-[65vh] bg-white pl-[30px]">
            <StepIndicator
              customStyles={customStyles}
              currentPosition={step}
              labels={labels}
              direction="vertical"
              stepCount={6}
            />
          </View>
          <View className="bg-white p-4 ">
            <View className="flex flex-row space-x-2 items-center">
              <FastImage source={icons.home2} className="w-[35px] h-[35px]" />
              <View className="w-[60vw]">
                <Text
                  className="text-black text-[17px] font-bold"
                  style={styles.customFont}>
                  Delivery Address
                </Text>
                <Text className="text-[13px] text-black">
                  {data.orderBy?.address}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-full bg-white w-full px-2">
            <View className="bg-white shadow-sm shadow-slate-500 px-2 py-1">
              <View className="flex flex-row space-x-2 items-center">
                <FastImage
                  source={icons.star2}
                  className="w-[50px] h-[50px]"
                  resizeMode="contain"
                />
                <View>
                  <Text
                    className="text-black text-[17px] font-bold"
                    style={styles.customFont}>
                    Please don't forget to rate.
                  </Text>
                  <Text className="text-gray-500 text-[13px]">
                    Hello {data.orderBy?.firstname}, please rate our delivery
                    service.
                  </Text>
                </View>
              </View>
              <View className="items-start pl-14">
                <Rating
                  type="custom"
                  ratingColor="orange"
                  ratingBackgroundColor="#c8c7c8"
                  ratingCount={5}
                  imageSize={22}
                  style={{paddingVertical: 5}}
                  startingValue={3}
                />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default TrackOrder;
