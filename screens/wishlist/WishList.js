import axios from 'axios';
import React, {useCallback, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useToast} from 'react-native-toast-notifications';
import {SwipeListView} from 'react-native-swipe-list-view';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {AlertDialog, Button, Divider, Input} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Header from '../checkout/Header';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const WishList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const toast = useToast();
  const [myWishList, setMyWishList] = useState([]);

  const re_moveToWishlist = async (prodId, title) => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.put(
        'products/wishlist/',
        {
          prodId,
        },
        config(token),
      );
      if (res.data.added) {
        return toast.show(`${title} added to wishlist`, {
          type: 'success',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
      } else {
        toast.show(`${title} removed from wishlist`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        });
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
      setMyWishList(response.data.wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getWishlistProducts();
      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, [myWishList]),
  );

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -250) {
    }
  };

  const renderItem = data => (
    <TouchableOpacity
      className="bg-white border-b-[1px] border-gray-100 py-4 px-2 relative"
      activeOpacity={1}>
      <View className="flex flex-row space-x-3 items-center">
        <FastImage
          source={{uri: data.item.images[0].url}}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
        <View className="flex space-y-2">
          <Text className="text-[12px] text-black w-[70vw]">
            {data.item.description}
          </Text>
          <Text className="text-[13px] text-gray-500 w-[70vw]">
            {data.item.title}
          </Text>
          <View>
            <Text className="text-black text-[13px]">
              Ksh {data.item?.price.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = data => (
    <View className="flex flex-row justify-between px-2 relative top-[55px]">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: data.item._id,
          })
        }
        className=" h-[100px] relative top-[-50px]">
        <LottieView
          source={require('../../assets/Wishlist.json')}
          autoPlay
          loop
          width={100}
          height={100}
        />
        <Text className="text-green-500 absolute top-[80px] left-[25px] text-[10px]">
          Add to cart
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => re_moveToWishlist(data.item._id, data.item.title)}
        className=" h-[100px] relative top-[-20px] w-[70px]">
        <LottieView
          source={require('../../assets/delete.json')}
          autoPlay
          loop
          width={50}
          height={50}
        />
        <Text className="text-red-500 absolute top-[45px] left-[13px] text-[10px]">
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="bg-gray-100">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Clear cart</AlertDialog.Header>
          <AlertDialog.Body>
            You are about to clear your cart. This action is irreversible and
            will remove all items from your cart. Please take a moment to review
            your cart contents before proceeding.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                Cancel
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  clearCart();
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                }}>
                Proceed
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <Header navigation={navigation} title="Wishlist" />

      {loading ? (
        <View className="h-[100px] absolute top-[53%] left-[33%] z-[999]">
          <LottieView
            source={require('../../assets/dots.json')}
            autoPlay
            loop
            width={120}
            height={120}
          />
        </View>
      ) : null}

      {myWishList?.length > 0 ? (
        <View className="z-[40] h-full">
          <SwipeListView
            data={myWishList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-100}
            leftOpenValue={100}
            disableRightSwipe={false}
            onSwipeValueChange={onSwipeValueChange}
          />
        </View>
      ) : (
        <View className="h-full  w-full justify-center items-center">
          <LottieView
            source={require('../../assets/emptycart.json')}
            autoPlay
            loop
            width={250}
            height={250}
            className="relative top-[-10vh]"
          />
          <Text
            className="text-black relative top-[-22vh] text-[13px] mx-3 text-center"
            style={styles.customFont}>
            No content here.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  rowFront: {
    backgroundColor: '#FFF',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingLeft: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  customFont: {
    fontFamily: 'serif',
  },
};

export default WishList;
