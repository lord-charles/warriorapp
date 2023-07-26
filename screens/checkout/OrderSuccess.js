import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'native-base';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';

const OrderSuccess = ({navigation, route}) => {
  const {data} = route.params;

  return (
    <View className="flex-1 bg-white">
      <View className="p-2">
        <Text
          className="text-black font-bold text-[20px] text-center underline text"
          style={styles.customFont}>
          Order Overview
        </Text>
      </View>

      <View className="relative right-[40px]">
        <LottieView
          source={require('../../assets/order_confirmed.json')}
          autoPlay
          loop
          width={470}
          height={470}
        />
      </View>

      <View className="flex flex-row justify-evenly">
        <View className="relative top-[450px] flex ">
          <Text
            className="text-black font-bold text-[17px]"
            style={styles.customFont}>
            Order Status
          </Text>
          <Text className="text-black text-[15px]">
            {data.order.orderStatus}
          </Text>
        </View>

        <View className="relative top-[450px] flex ">
          <Text
            className="text-black font-bold text-[17px]"
            style={styles.customFont}>
            Payment Method
          </Text>
          <Text className="text-black text-[15px]">
            {data.order.paymentIntent.method}
          </Text>
        </View>
        <View className="relative top-[450px] flex ">
          <Text
            className="text-black font-bold text-[17px]"
            style={styles.customFont}>
            Amount Paid
          </Text>
          <Text className="text-black text-[15px]">
            Ksh {data.order.paymentIntent.amount}
          </Text>
        </View>
      </View>

      <View className="relative top-[57vh] px-4 flex flex-row items-center space-x-1 justify-center">
        <Text className="text-black font-bold text-[16px]">
          You can track your order number
        </Text>
        <Text className="text-red-500">{data.order.paymentIntent.id}</Text>
      </View>

      <View className="flex flex-row justify-evenly  px-4 space-x-2  relative top-[59vh]">
        <Button
          mt={4}
          className="bg-green-500 text-white w-[50%]"
          onPress={() => navigation.navigate('DrawerNav')}>
          <View>
            <Text
              style={styles.customFont}
              className="text-white font-bold text-[16px]">
              Continue shopping
            </Text>
          </View>
        </Button>

        <Button
          mt={4}
          className="bg-red-500 text-white w-[50%]"
          onPress={() => navigation.navigate('MyOrders')}>
          <View>
            <Text
              style={styles.customFont}
              className="text-white font-bold text-[16px]">
              Track
            </Text>
          </View>
        </Button>
      </View>

      <View className="relative top-[62vh] px-4">
        <Text
          className="text-black font-bold text-[17px]"
          style={styles.customFont}>
          How do you like our app?
        </Text>
        <View className="flex space-y-2 mt-2">
          <Button
            variant={'outline'}
            className="bg-transparent"
            onPress={() => alert('coming soon')}>
            <View className="flex flex-row items-center space-x-3">
              <FastImage
                source={icons.star}
                className="w-[20px] h-[20px]"
                tintColor={'black'}
              />
              <Text className="text-black font-bold text-[16px]">
                Rate our application
              </Text>
            </View>
          </Button>

          <Button
            variant={'outline'}
            className="bg-transparent"
            onPress={() => alert('coming soon')}>
            <View className="flex flex-row items-center space-x-3">
              <FastImage
                source={icons.message}
                className="w-[20px] h-[20px]"
                tintColor={'black'}
              />
              <Text className="text-black font-bold text-[16px]">
                Leave a feedback
              </Text>
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default OrderSuccess;
