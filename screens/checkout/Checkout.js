import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Header from './Header';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {Button, Divider, Input} from 'native-base';
import {useToast} from 'react-native-toast-notifications';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';
import PlaceOrderModal from './Modal';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const Checkout = ({navigation}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [check, setCheck] = useState(0);
  const [coupon, setcoupon] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [friendPay, setFriendPay] = useState(false);

  const handleCoupon = value => {
    setcoupon(value);
  };

  const getCart = async () => {
    setLoading(true);
    console.log('Adding checkout');
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('user/cart/getcart', config(token));

      setLoading(false);
      setCartData(res.data);
      //   console.log(res.data.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Function to be executed when the screen comes into focus
      // Example: Fetch cart content

      // Call the function
      getCart();

      // Optionally, return a cleanup function if needed
      // This will be executed when the component unmounts or when the screen loses focus
      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );

  const placeOrder = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/cart/order/',
        {paymentMethod: friendPay ? 'PAID' : 'COD'},
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

  const handlePlaceOrder = async () => {
    if (check === 0) {
      return toast.show('Please select payment method!', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else if (check === 1) {
      setFriendPay(false);
      setModalVisible(true);
    } else if (check === 2) {
      setFriendPay(true);
      setModalVisible(true);
    } else {
      placeOrder();
    }
  };
  return (
    <>
      {loading ? (
        <View className="bg-gray-100 h-full w-screen relative">
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
        </View>
      ) : (
        <View className="flex-1 bg-gray-100">
          <Header title="Place Order" navigation={navigation} />

          {modalVisible && (
            <PlaceOrderModal
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
              navigation={navigation}
              amount={cartData.cartTotal}
              friendPay={friendPay}
            />
          )}

          <FlatList
            data={cartData.products}
            removeClippedSubviews={true}
            showsVerticalScrollIndicator={false}
            // columnWrapperStyle={{
            //   justifyContent: 'space-between',
            //   paddingHorizontal: 8,
            //   alignItems: 'center',
            // }}
            keyExtractor={item => `${item._id}`}
            ListHeaderComponent={
              <View>
                {/* shipping address */}
                <TouchableOpacity className="mt-[1px] bg-white p-2">
                  <View className="flex flex-row justify-between items-center">
                    <Text
                      className="text-[16px] text-black"
                      style={styles.customFont}>
                      Shipping information
                    </Text>
                    <View className="flex flex-row justify-between items-center space-x-1">
                      <Text className="text-blue-900">Edit</Text>
                      <FastImage
                        source={icons.right_chevron}
                        className="w-[15px] h-[15px]"
                        resizeMode="contain"
                        tintColor="#020a3b"
                        alt="image"
                      />
                    </View>
                  </View>

                  <View className="flex flex-row items-center space-x-2 p-3 justify-center">
                    <FastImage
                      source={icons.warning}
                      className="w-[20px] h-[20px]"
                      resizeMode="contain"
                      tintColor="#020a3b"
                      alt="image"
                    />
                    <Text className="text-blue-900 font-bold text-[15px]">
                      Please add shipping address here &gt;
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* payment method  */}
                <View className="mt-[10px] bg-white p-2 ">
                  <View>
                    <Text
                      className="text-black text-[16px]"
                      style={styles.customFont}>
                      Payment Method
                    </Text>
                    <Text className="text-gray-500 text-[13px]">
                      Trusted Payment, 100% Money Back Guarantee.
                    </Text>
                  </View>

                  <View className="flex space-y-2 mt-2">
                    <TouchableOpacity
                      className={`flex flex-row justify-between items-center p-1.5 ${
                        check === 1 ? `border border-red-400 rounded-md ` : null
                      }`}
                      onPress={() => setCheck(1)}>
                      <View className="flex flex-row space-x-4 items-center">
                        <FastImage
                          source={icons.mpesa}
                          className="w-[38px] h-[38px]"
                          resizeMode="contain"
                          alt="image"
                        />
                        <View className="flex flex-row space-x-2 items-center">
                          <Text className="text-black">MPesa</Text>
                          <Text className="text-black italic text-[13px]">
                            (Recommended)
                          </Text>
                        </View>
                      </View>
                      <View>
                        {check === 1 ? (
                          <FastImage
                            source={icons.check_on}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                        ) : (
                          <FastImage
                            source={icons.check_off}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className={`flex flex-row justify-between items-center p-1.5 ${
                        check === 2 ? `border border-red-400 rounded-md ` : null
                      }`}
                      onPress={() => setCheck(2)}>
                      <View className="flex flex-row space-x-4 items-center">
                        <FastImage
                          source={icons.requestfriend}
                          className="w-[38px] h-[38px]"
                          resizeMode="contain"
                          alt="image"
                        />
                        <Text className="text-black">
                          Request a friend to pay
                        </Text>
                      </View>
                      <View>
                        {check === 2 ? (
                          <FastImage
                            source={icons.check_on}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                        ) : (
                          <FastImage
                            source={icons.check_off}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className={`flex flex-row justify-between items-center p-1.5 ${
                        check === 3 ? `border border-red-400 rounded-md ` : null
                      }`}
                      onPress={() => setCheck(3)}>
                      <View className="flex flex-row space-x-4 items-center">
                        <FastImage
                          source={icons.cash_on_delivery}
                          className="w-[38px] h-[38px]"
                          resizeMode="contain"
                          alt="image"
                        />
                        <Text className="text-black">Cash on derivery</Text>
                      </View>
                      <View>
                        {check === 3 ? (
                          <FastImage
                            source={icons.check_on}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                        ) : (
                          <FastImage
                            source={icons.check_off}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="h-[10px] bg-gray-100" />
                <View className="bg-white p-2 flex flex-row justify-between items-center">
                  <Text
                    className="text-[16px] text-black"
                    style={styles.customFont}>
                    Goods list
                  </Text>

                  <Text className="text-[12px] text-gray-500">
                    Summary (
                    {cartData.products?.reduce(
                      (acc, curr) => acc + curr.count,
                      0,
                    )}{' '}
                    items)
                  </Text>
                </View>
              </View>
            }
            renderItem={({item}, props) => {
              return (
                <>
                  <View className="bg-white mt-0 rounded-[5px] px-2">
                    <TouchableOpacity className="flex flex-row space-x-2 items-center p-1">
                      <FastImage
                        source={{uri: item.product.images[0].url}}
                        className="w-[90px] h-[90px]"
                        resizeMode="contain"
                        alt="image"
                      />
                      <View className="flex space-y-2 w-[100%]">
                        <Text className="text-black text-[13px]">
                          {item.product.description}
                        </Text>
                        <Text className="text-gray-500 text-[13px]">
                          {item.color}
                        </Text>
                        <View className="flex flex-row justify-between items-center">
                          <Text className="text-black text-[15px] font-bold">
                            {item.product.price.toLocaleString()}
                          </Text>
                          <Text className="text-gray-500 text-[11px] relative right-[100px]">
                            x{item.count}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
            ListFooterComponent={
              <View className="pb-[67px]">
                <View className="bg-white mt-[10px] px-2 pb-3">
                  <Text
                    className="text-[16px] text-black py-2"
                    style={styles.customFont}>
                    Discount
                  </Text>

                  <View className="flex flex-row justify-between">
                    <View className=" w-[79%]">
                      <Input
                        placeholder="Enter coupon code"
                        onChangeText={handleCoupon}
                        value={coupon}
                        keyboardType="numeric"
                        returnKeyType="done"
                        borderColor="blue.900"
                        className="text-black text-[14px]"
                      />
                    </View>

                    <Button className="w-[20%] bg-blue-900">Apply</Button>
                  </View>
                </View>

                <View className="flex flex-row justify-end bg-gray-100 p-2">
                  <Text className="text-blue-900 underline">
                    Shipping fee policy
                  </Text>
                </View>

                <View className="bg-white p-2 flex space-y-1">
                  <Text
                    className="text-black text-[17px] font-bold"
                    style={styles.customFont}>
                    Total
                  </Text>
                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-black text-[15px]">
                      Goods Amount:
                    </Text>
                    <Text className="text-black text-[13px]">
                      Ksh{' '}
                      {cartData.products?.length > 0
                        ? cartData.cartTotal.toLocaleString()
                        : null}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-between items-center">
                    <Text className="text-black text-[15px]">
                      Shipping fee:
                    </Text>
                    <Text className="text-black text-[13px]">+ Ksh 100</Text>
                  </View>
                </View>
              </View>
            }
          />

          <View className="bg-white absolute top-[92vh] h-[70px] w-full z-[999] px-2">
            <Divider className="mb-4" />
            <View className="flex flex-row justify-between items-center  mt-4.5">
              <View className="flex flex-row items-center space-x-1">
                <Text className="text-blue-900 text-[17px] font-bold">Ksh</Text>
                <Text
                  className="text-blue-900 text-[17px] font-bold"
                  style={styles.customFont}>
                  {cartData.products?.length > 0
                    ? Math.ceil(cartData?.cartTotal).toLocaleString()
                    : null}
                </Text>
              </View>
              <Button
                className="w-[110px] bg-blue-900"
                onPress={() => {
                  handlePlaceOrder();
                }}>
                <Text
                  style={styles.customFont}
                  className="text-white text-[17px] font-bold">
                  Place Order
                </Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default Checkout;
