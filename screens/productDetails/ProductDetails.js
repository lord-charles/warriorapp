import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {base_url} from '../../utils/baseUrl';
import Header from './Header';
import LottieView from 'lottie-react-native';
import {icons, images} from '../../constants';
import * as Progress from 'react-native-progress';
import {Rating} from 'react-native-ratings';
import {reviews} from '../../utils/data';
import {Button, Divider} from 'native-base';
import {FilterModal} from '../../components';
import {useToast} from 'react-native-toast-notifications';
import config from '../../utils/axiosconfig';
import {useFocusEffect} from '@react-navigation/native';
import {Linking} from 'react-native';
import FastImage from 'react-native-fast-image';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const ProductDetails = ({navigation, route}) => {
  const {id} = route.params;
  const toast = useToast();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alsoViewed, setAlsoViewed] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [data, setData] = useState([]);
  const [wishlistData, setWishlistData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const width = Dimensions.get('window').width;

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${base_url}products/${id}`);
      setLoading(false);
      setProduct(res.data);
      const res2 = await axios.get(
        `${base_url}products?category=${res.data.findProduct.category[0]._id}`,
      );
      setAlsoViewed(res2.data.data);
      // console.log(res2.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCart = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.get('/cart');
      // console.log(res);
      setData(res.data?.items);
    } catch (err) {
      console.log(err);
    }
  };

  const getWishlistProducts = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      const response = await api.get(
        `${base_url}user/wishlist/`,
        config(token),
      );
      setWishlistData(response.data.wishlist.length);
    } catch (err) {
      console.log(err);
    }
  };
  const addToWishlist = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.put(
        'products/wishlist/',
        {
          prodId: product.findProduct._id,
        },
        config(token),
      );
      if (res.data.added) {
        return (
          toast.show(`${product.findProduct.title} added to wishlist`, {
            type: 'success',
            placement: 'top',
            duration: 2000,
            offset: 30,
            animationType: 'slide-in',
          }),
          getWishlistProducts()
        );
      } else {
        toast.show(`${product.findProduct.title} removed from wishlist`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        }),
          getWishlistProducts();
      }
    } catch (error) {
      console.error(error);
      toast.show('retry', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  const handleMessage = platform => {
    setModalVisible(false);
    let url;
    const phoneNumber = '+254740315545';
    switch (platform) {
      case 'messages':
        const message =
          'Hello, I need your assistance to complete a purchase. Can you please help me?';
        url = `sms:${encodeURIComponent(phoneNumber)}`;
        break;

      case 'whatsapp':
        const whatsappMessage =
          'Hello, I need your assistance to complete a purchase. Can you please help me?';
        url = `whatsapp://send?phone=${encodeURIComponent(
          phoneNumber,
        )}&text=${encodeURIComponent(whatsappMessage)}`;
        break;

      case 'email':
        const emailSubject = 'Request for Assistance: Complete Purchase';
        const emailBody = `Dear Support Team,
  
  I hope this email finds you well. I am writing to seek your assistance in completing a purchase. I have encountered some difficulties during the checkout process and would appreciate any help you can provide.
  
  Please let me know the steps or any additional information required to successfully finalize my purchase.
  
  Thank you for your attention to this matter.
  
  Kind regards,
  [Your Name]`;

        url = `mailto:mwanikicharles226@gmail.com?subject=${encodeURIComponent(
          emailSubject,
        )}&body=${encodeURIComponent(emailBody)}`;
        break;

      case 'telegram':
        const telegrammessage =
          'Hello, I need your assistance to complete a purchase. Can you please help me?';

        url = `https://t.me/${encodeURIComponent(
          phoneNumber,
        )}?text=${encodeURIComponent(telegrammessage)}`;
        break;
      case 'twitter':
        const twitterMessage = `Hello, I need your assistance to complete a purchase. Can you please help me?`;
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          twitterMessage,
        )}`;
        break;

      default:
        return;
    }

    Linking.openURL(url);
  };

  useFocusEffect(
    useCallback(() => {
      getProduct();
      getCart();
      getWishlistProducts();
      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );
  return (
    <View className="bg-gray-100">
      <Header navigation={navigation} data={data} wishlistData={wishlistData} />

      {/* filltermodal */}
      {showFilterModal && (
        <FilterModal
          isVisible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          product={product.findProduct}
          isOrder={isOrder}
          getCart={getCart}
          navigation={navigation}
        />
      )}

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
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="relative top-[0px] bg-white">
            <Carousel
              loop
              width={width}
              height={350}
              autoPlay={true}
              data={product.findProduct?.images}
              scrollAnimationDuration={2000}
              mode="parallax"
              // onSnapToItem={index => console.log('current index:', index)}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flex: 1,
                  }}
                  className="">
                  <Image
                    source={{uri: item.url}}
                    className="w-screen h-[350px] rounded-md"
                    resizeMode="contain"
                    alt="image"
                  />
                </View>
              )}
            />
            {/* section 1  */}
            <View className=" p-3 flex space-y-2">
              {product.findProduct?.quantity < 1 ? (
                <Text className="text-black  bg-gray-200 p-1 w-[70px] text-center rounded-full text-[12px]">
                  out of stock
                </Text>
              ) : null}
              {/* price  */}

              {product.flashSuccess ? null : (
                <Text className="text-black text-[14px] font-bold">
                  KSh {product.findProduct?.price.toLocaleString()}
                </Text>
              )}

              {/* name */}
              <Text
                className="text-black text-[14px]"
                style={styles.customFont}>
                {product.findProduct?.title}
              </Text>

              {/* description */}
              <Text className="text-black text-[17px]">
                {product.findProduct?.description}
              </Text>

              {/* category  */}
              <View className="flex flex-row items-center space-x-1">
                <Text className="text-black">Category:</Text>
                <Text className="text-[13px] text-black">
                  {product.findProduct?.category[0].title}
                </Text>
              </View>

              {/* brand  */}
              <View className="flex flex-row items-center space-x-1">
                <Text className="text-black">Brand:</Text>
                <Text className="text-[13px] text-black">
                  {product.findProduct?.brand[0].title} | similar product from{' '}
                  {product.findProduct?.brand[0].title}
                </Text>
              </View>

              {/* ifinflashsale  */}
              <View>
                {product.flashSuccess ? (
                  <View className="h-[100px] w-full border  border-blue-900 rounded-md ">
                    <View
                      className="flex flex-row justify-between"
                      style={{backgroundColor: '#020a3b'}}>
                      <View className="h-[40px] flex flex-row items-center">
                        <Image
                          source={icons.flash_deal}
                          alt="image flash"
                          className="w-[30px] h-[20px]"
                          resizeMode="contain"
                          tintColor="white"
                        />
                        <Text className="text-white font-bold">
                          flash sales
                        </Text>
                      </View>
                      <View className="flex flex-row items-center px-1">
                        <Text className="text-white text-[13px]">
                          Ends in : N/A
                        </Text>
                        {/* <CountDown
                    until={10}
                    onFinish={() => alert('finished')}
                    onPress={() => alert('hello')}
                    size={20}
                  /> */}
                      </View>
                    </View>
                    <View className="flex flex-row items-center space-x-2 px-2  mt-[5px]">
                      <Text className="text-black text-[16px] font-bold ">
                        Ksh{' '}
                        {Math.floor(
                          product.findProduct?.price -
                            product.findProduct?.price *
                              (product.flashSaleProduct[0].discountPercentage /
                                100),
                        ).toLocaleString()}
                      </Text>
                      <Text className="text-gray-500 text-[13px] line-through mt-[2px]">
                        Ksh{' '}
                        {Math.floor(
                          product.findProduct?.price,
                        ).toLocaleString()}
                      </Text>
                      <Text className="text-blue-900 text-[11px] bg-orange-100 rounded-md p-1">
                        -{product.flashSaleProduct[0].discountPercentage}%
                      </Text>
                    </View>

                    <View className="flex flex-row  space-x-3 mt-[8px] items-center px-2">
                      <Text className="text-[11px] text-black">
                        {product.flashSaleProduct[0].quantity} units left
                      </Text>
                      <Progress.Bar
                        progress={
                          (product.flashSaleProduct[0].quantity / 2000) * 100
                        }
                        width={270}
                        height={8}
                        className="text-blue-900"
                        color="#020a3b"
                      />
                    </View>
                  </View>
                ) : null}
              </View>

              {/* rating  */}
              <View className="flex flex-row justify-between items-center  mt-[5px]">
                <Rating
                  type="custom"
                  ratingColor="#020a3b"
                  ratingBackgroundColor="#c8c7c8"
                  ratingCount={5}
                  imageSize={15}
                  readonly
                  // style={{paddingVertical: 5}}
                  startingValue={3.5}
                />
                <View className="flex flex-row items-center space-x-5">
                  <TouchableOpacity className="">
                    <Image
                      source={icons.share}
                      className="w-[20px] h-[20px]"
                      style={{tintColor: '#020a3b'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => addToWishlist()}>
                    <Image
                      source={icons.favourite}
                      className="w-[20px] h-[20px]"
                      style={{tintColor: '#020a3b'}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* section 2  */}
            <Text className="text-gray-500 font-bold bg-gray-100  relative pt-[10px] pb-[5px] px-2 text-[13px]">
              PROMOTIONS
            </Text>
            <View className="bg-white px-2 flex space-y-2 py-2">
              <View className="flex flex-row items-center space-x-2">
                <Image
                  source={icons.shipping}
                  className="w-[20px] h-[20px]"
                  resizeMode="contain"
                  style={{tintColor: '#020a3b'}}
                />
                <Text className="text-black text-[12px]">
                  Free delivery for orders above Ksh 1999 in selected major
                  cities.
                </Text>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <Image
                  source={icons.securepay}
                  className="w-[20px] h-[20px]"
                  resizeMode="contain"
                  style={{tintColor: '#020a3b'}}
                />
                <Text className="text-black text-[12px]">
                  Easy and safer payments via the FashionWarrior App.
                </Text>
              </View>
            </View>

            {/* section 3  */}
            <Text className="text-gray-500 font-bold bg-gray-100  relative pt-[10px] pb-[5px] px-2 text-[13px]">
              DERIVERY & RETURNS INFO
            </Text>
            <View className="bg-white px-2 flex space-y-2 py-2">
              <View className="flex flex-row items-center space-x-2 relative">
                <Text
                  className="text-black font-bold"
                  style={styles.customFont}>
                  FashionWarrior
                </Text>
              </View>
              <View className="flex flex-row items-center space-x-2 ">
                <Image
                  source={icons.shipping}
                  className="w-[20px] h-[20px] "
                  resizeMode="contain"
                  alt="image"
                />
                <Text className="text-black text-[12px]">
                  Free delivery for orders above Ksh 1999 in selected major
                  cities.
                </Text>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <Image
                  source={icons.securepay}
                  className="w-[20px] h-[20px]"
                  resizeMode="contain"
                  alt="image"
                />
                <Text className="text-black text-[12px]">
                  Easy return and quick refund.
                </Text>
              </View>
            </View>

            {/* section 4  */}
            <Text className="text-gray-500 font-bold bg-gray-100  relative pt-[10px] pb-[5px] px-2 text-[13px]">
              PRODUCT DETAILS
            </Text>
            <View className="p-2">
              <Text className="text-black text-[13px]">
                {product.findProduct?.richDescription}
              </Text>
            </View>

            {/* section 5  */}
            <Text className="text-gray-500 font-bold bg-gray-100  relative pt-[10px] pb-[5px] px-2 text-[13px]">
              CUSTOMERS ALSO VIEWED
            </Text>
            <View className="w-full h-fit p-2">
              <FlatList
                data={alsoViewed}
                ItemSeparatorComponent={() => <View className="w-6" />}
                keyExtractor={item => `${item._id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}, props) => {
                  return (
                    <>
                      <TouchableOpacity
                        className="bg-white mt-2"
                        onPress={() =>
                          navigation.replace('ProductDetails', {
                            id: item._id,
                          })
                        }>
                        <Image
                          source={{uri: item.images[0].url}}
                          alt="image"
                          className="w-[100px] h-[100px]"
                          resizeMode="contain"
                        />
                        <Text className="text-black text-[12px] relative top-[10px]">
                          <Text className="text-black text-[12px] ">
                            {item.description.slice(0, 18)}
                            {item.description.length > 18 ? '...' : ''}
                          </Text>
                        </Text>
                        <Text className="text-black text-[12px] font-bold text-center mt-[10px]">
                          Ksh {Math.floor(item.price).toLocaleString()}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>

            {/* section 6  */}
            <Text className="text-gray-500 font-bold bg-gray-100  relative pt-[10px] pb-[5px] px-2 text-[13px]">
              VERIFIED CUSTOMER FEEDBACK
            </Text>
            <View className="w-full h-fit p-2">
              <>
                {reviews.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} className="bg-white mt-4">
                      <View className="flex flex-row justify-between items-center">
                        <View className="flex flex-row space-x-2 items-center">
                          <Image
                            source={icons.officialuser}
                            className="w-[20px] h-[20px]"
                            resizeMode="contain"
                            alt="image"
                          />
                          <Text className="text-black">{item.name}</Text>
                        </View>
                        <Text className="text-[13px]">{item.date}</Text>
                      </View>

                      <View className="flex items-start py-2">
                        <Rating
                          type="custom"
                          ratingColor="#020a3b"
                          ratingBackgroundColor="#c8c7c8"
                          ratingCount={5}
                          imageSize={15}
                          readonly
                          // style={{paddingVertical: 5}}
                          startingValue={item.rating}
                        />
                      </View>
                      <View className="pb-2">
                        <Text className="text-black text-[13px]">
                          {item.description}
                        </Text>
                      </View>
                      <Divider />
                    </TouchableOpacity>
                  );
                })}
              </>
            </View>

            {/* section 5  */}
            <Text className="text-gray-500 font-bold bg-gray-100  relative pt-[10px] pb-[5px] px-2 text-[13px]">
              RELATED BEST SELLING PRODUCTS
            </Text>
            <View className="w-full h-fit p-2">
              <FlatList
                data={alsoViewed}
                ItemSeparatorComponent={() => <View className="w-6" />}
                keyExtractor={item => `${item._id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}, props) => {
                  return (
                    <>
                      <TouchableOpacity
                        className="bg-white mt-2"
                        onPress={() =>
                          navigation.replace('ProductDetails', {
                            id: item._id,
                          })
                        }>
                        <Image
                          source={{uri: item.images[0].url}}
                          alt="image"
                          className="w-[100px] h-[100px]"
                          resizeMode="contain"
                        />
                        <Text className="text-black text-[12px] relative top-[10px]">
                          <Text className="text-black text-[12px] ">
                            {item.description.slice(0, 18)}
                            {item.description.length > 18 ? '...' : ''}
                          </Text>
                        </Text>
                        <Text className="text-black text-[12px] font-bold text-center mt-[10px]">
                          Ksh {Math.floor(item.price).toLocaleString()}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                }}
              />
            </View>

            <View className="h-[100px]" />
          </ScrollView>
          <View className="absolute bottom-[55px] h-[52px] w-full z-[999] bg-white flex flex-row justify-between items-center">
            {/* part 1  */}
            <View className="flex flex-row items-center space-x-2 px-2">
              <TouchableOpacity
                className="border-2 p-1 rounded-lg"
                onPress={() => setModalVisible(true)}>
                <Image
                  source={icons.chat}
                  className="w-[25px] h-[25px]"
                  resizeMode="contain"
                  alt="image"
                  style={{tintColor: 'black'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="border-2 p-1 rounded-lg"
                onPress={() => Linking.openURL(`tel:+${254740315545}`)}>
                <Image
                  source={icons.call}
                  className="w-[25px] h-[25px]"
                  resizeMode="contain"
                  alt="image"
                  style={{tintColor: 'black'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="border-2 p-1 rounded-lg"
                onPress={() => navigation.navigate('WishList')}>
                <Image
                  source={icons.favourite}
                  className="w-[25px] h-[25px]"
                  resizeMode="contain"
                  alt="image"
                  style={{tintColor: 'black'}}
                />
              </TouchableOpacity>
            </View>

            {/* part 2  */}
            <View className="border-2 w-[60%] h-[40px] flex flex-row items-center justify-between rounded-full relative top-[1px] left-[-10px] ">
              <TouchableOpacity
                className="w-[50%]  h-full flex justify-center"
                onPress={() => {
                  setShowFilterModal(true), setIsOrder(false);
                }}>
                <Text className=" text-center text-[14px] text-black font-bold">
                  Add To Cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{backgroundColor: '#020a3b'}}
                className="w-[55%] h-[40px] flex justify-center rounded-r-full"
                onPress={() => {
                  setShowFilterModal(true), setIsOrder(true);
                }}>
                <Text className="text-center text-[14px] text-white font-bold">
                  Order Now
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Modal
                visible={modalVisible}
                transparent={true}
                onPress={() => setModalVisible(false)}
                animationType="slide">
                <View
                  className="bg-white flex-1"
                  style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                  <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}>
                    <View className="absolute top-0 left-0 right-0 bottom-0 " />
                  </TouchableWithoutFeedback>
                  <View className="relative top-[89vh] h-[14vh] bg-white rounded-md">
                    <Text
                      className="text-black font-bold text-center text-[15px] p-1"
                      style={styles.customFont}>
                      Select a messaging platform
                    </Text>

                    <View className="flex flex-row justify-evenly p-1">
                      <TouchableOpacity
                        onPress={() => handleMessage('messages')}>
                        <FastImage
                          source={icons.message2}
                          className="w-[45px] h-[45px]"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMessage('whatsapp')}>
                        <FastImage
                          source={icons.whatsapp}
                          className="w-[45px] h-[45px]"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleMessage('email')}>
                        <FastImage
                          source={icons.gmail}
                          className="w-[45px] h-[45px]"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMessage('telegram')}>
                        <FastImage
                          source={icons.telegram}
                          className="w-[45px] h-[45px]"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleMessage('twitter')}>
                        <FastImage
                          source={icons.twitter}
                          className="w-[45px] h-[45px]"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
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

export default ProductDetails;
