import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons} from '../constants';
import config from '../utils/axiosconfig';
import axios from 'axios';
import {base_url} from '../utils/baseUrl';
import {useFocusEffect} from '@react-navigation/native';

const Header = ({navigation, wishlistData}) => {
  const [data, setData] = useState([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';
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

  useFocusEffect(
    useCallback(() => {
      getCart();

      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );

  return (
    <View className="bg-white">
      <View className="my-2 mx-4  flex flex-row justify-between items-center">
        <View className="flex flex-row space-x-3 items-center">
          <TouchableOpacity
            className="border border-gray-300 p-[3px] rounded-md"
            onPress={() => navigation.openDrawer()}>
            <Image
              source={icons.menu}
              className="w-[20px] h-[20px]"
              style={{tintColor: 'black'}}
            />
          </TouchableOpacity>

          <Text
            className="text-black text-[20px] font-bold"
            style={styles.customFont}>
            FashionWarrior
          </Text>
        </View>
        <View className="flex flex-row space-x-6">
          <TouchableOpacity>
            <Image
              source={icons.search}
              className="w-[20px] h-[20px]"
              style={{tintColor: 'black'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
            <Image
              source={icons.heart}
              className="w-[20px] h-[20px]"
              style={{tintColor: 'black'}}
            />
            {wishlistData !== null && wishlistData > 0 ? (
              <View className="absolute right-[-10px] top-[-11px] bg-red-500 rounded-full  h-[17px] w-[17px] items-center flex justify-center">
                <Text className="text-[11px] text-center text-white">
                  {wishlistData}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>

          <TouchableOpacity
            className="relative"
            onPress={() => navigation.navigate('Cart')}>
            <Image
              source={icons.cart}
              className="w-[20px] h-[20px]"
              style={{tintColor: 'black'}}
            />

            {data?.length > 0 ? (
              <View className="absolute right-[-10px] top-[-11px] bg-red-500 rounded-full  h-[17px] w-[17px] items-center flex justify-center">
                <Text className="text-[11px] text-center text-white">
                  {data.length}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
  customColor: {
    color: '#e52e04',
  },
});
export default Header;
