import {Button} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';

const OrderCard = ({item, navigation}) => {
  return (
    <View className="bg-white mt-1 rounded-[5px] p-2">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center space-x-1">
          <Text
            className="text-[15px] text-black font-bold"
            style={styles.customFont}>
            Order No:
          </Text>
          <Text className="text-[11px] text-black">{item._id}</Text>
        </View>
        <View className="flex flex-row space-x-1 items-center">
          <Text className="text-black text-[13px]">Status:</Text>
          <Text
            className={`text-white font-bold p-1 rounded-md ${
              item.orderStatus === 'Delivered'
                ? 'bg-green-500'
                : item.orderStatus === 'Cancelled'
                ? 'bg-red-500'
                : item.orderStatus === 'Cash on Delivery'
                ? 'bg-orange-300'
                : item.orderStatus === 'Processing'
                ? 'bg-orange-400'
                : item.orderStatus === 'Dispatched'
                ? 'bg-gray-400'
                : 'bg-orange-300'
            }`}
            style={styles.customFont}>
            {item.orderStatus}
          </Text>
        </View>
      </View>

      <View className="mr-2">
        {item.products.length > 1 ? (
          <View className="flex flex-row p-2 space-x-1">
            <View>
              <Carousel
                loop
                width={115}
                height={122}
                autoPlay={true}
                data={item.products}
                scrollAnimationDuration={2500}
                mode=""
                // onSnapToItem={index => console.log('current index:', index)}
                renderItem={({item, index}) => (
                  <View className="flex flex-col">
                    <FastImage
                      source={{uri: item.product.images[0].url}}
                      className="w-[100px] h-[100px] rounded-md"
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text className="text-gray-500 text-center text-[11px]">
                      {index + 1}. {item.product.title}
                    </Text>
                  </View>
                )}
              />
            </View>
            <View>
              <View className="flex space-y-0.5 h-[50px] overflow-hidden">
                {item.products.map((product, index) => {
                  return (
                    <View key={index}>
                      <Text className="text-black text-[11px]">
                        {index + 1}. {product.product.description}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View>
                <Text
                  className="text-black relative left-[17px]"
                  style={styles.customFont}>
                  Goods Summary
                </Text>

                <View className="flex flex-row justify-evenly">
                  <View>
                    <Text className="text-black font-bold text-[12px]">
                      Count
                    </Text>
                    <Text className="text-gray-500 text-[11px] text-center">
                      x{' '}
                      {item.products.reduce((acc, curr) => acc + curr.count, 0)}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-black font-bold text-[12px]">
                      Total Amount
                    </Text>
                    <Text className="text-gray-500 text-[11px] text-center">
                      Ksh {item.paymentIntent.amount.toLocaleString()}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-black font-bold text-[12px]">
                      Payment Method
                    </Text>
                    <Text className="text-gray-500 text-[11px] text-center">
                      {item.paymentIntent.method}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row justify-between  space-x-4 relative left-6 top-2">
                  <Button
                    colorScheme={'green'}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {
                        id: item.products[0].product._id,
                      })
                    }>
                    Buy again
                  </Button>
                  <View>
                    {item.orderStatus === 'Delivered' ? (
                      <Button
                        colorScheme={'#020a3b'}
                        onPress={() => {
                          navigation.navigate('TrackOrder', {id: item._id});
                        }}>
                        Review now to earn
                      </Button>
                    ) : item.orderStatus === 'Cancelled' ? (
                      <Button colorScheme={'red'}>
                        Contact us for more info
                      </Button>
                    ) : (
                      <Button
                        className="bg-blue-900"
                        onPress={() => {
                          navigation.navigate('TrackOrder', {id: item._id});
                        }}>
                        Track package now
                      </Button>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex flex-row space-x-2 p-2">
            <View className="w-[116px]">
              <FastImage
                source={{
                  uri: item.products[0].product.images[0].url,
                }}
                className="w-[115px] h-[115px] rounded-md"
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text className="text-gray-500 text-[11px] text-center p-1">
                1. {item.products[0].product.title}
              </Text>
            </View>

            <View className="flex flex-col space-y-11">
              <View className="relative top-[20px]">
                <Text className="text-black text-[11px]">
                  1. {item.products[0].product.description}
                </Text>
              </View>

              <View className="w-[63vw]">
                <Text
                  className="text-black relative left-[20px]"
                  style={styles.customFont}>
                  Goods Summary
                </Text>

                <View className="flex flex-row justify-evenly">
                  <View>
                    <Text className="text-black font-bold text-[12px]">
                      Count
                    </Text>
                    <Text className="text-gray-500 text-[11px] text-center">
                      x {item.products[0].count}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-black font-bold text-[12px]">
                      Total Amount
                    </Text>
                    <Text className="text-gray-500 text-[11px] text-center">
                      Ksh {item.paymentIntent.amount.toLocaleString()}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-black font-bold text-[12px]">
                      Payment Method
                    </Text>
                    <Text className="text-gray-500 text-[11px] text-center">
                      {item.paymentIntent.method}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row justify-evenly relative top-2">
                  <Button
                    colorScheme={'green'}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {
                        id: item.products[0].product._id,
                      })
                    }>
                    Buy again
                  </Button>
                  {item.orderStatus === 'Delivered' ? (
                    <Button
                      colorScheme={'red'}
                      onPress={() => {
                        navigation.navigate('TrackOrder', {id: item._id});
                      }}>
                      Review now to earn
                    </Button>
                  ) : item.orderStatus === 'Cancelled' ? (
                    <Button colorScheme={'red'}>
                      Contact us for more info
                    </Button>
                  ) : (
                    <Button
                      className="bg-blue-900"
                      onPress={() => {
                        navigation.navigate('TrackOrder', {id: item._id});
                      }}>
                      Track package now
                    </Button>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});
export default OrderCard;
