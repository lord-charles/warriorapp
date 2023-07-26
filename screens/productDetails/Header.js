import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {icons} from '../../constants';

import FastImage from 'react-native-fast-image';

const Header = ({navigation, data, wishlistData}) => {
  return (
    <View className="h-[55px] bg-gray-100 flex flex-row items-center justify-between px-2">
      <View className="flex flex-row space-x-3 items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FastImage
            source={icons.backarrow}
            className="w-[25px] h-[25px]"
            resizeMode="contain"
            tintColor="black"
            alt="image"
          />
        </TouchableOpacity>

        <Text className="text-black font-bold text-[20px]">Details</Text>
      </View>
      <View className="flex flex-row space-x-4 items-center">
        <TouchableOpacity className="relative  bg-white  p-2.5 rounded-full">
          <FastImage
            source={icons.search}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
            tintColor="black"
            alt="image"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className=" bg-white  p-2.5 rounded-full"
          onPress={() => navigation.navigate('WishList')}>
          <FastImage
            source={icons.heart}
            className="w-[20px] h-[20px]"
            tintColor="black"
          />
          {wishlistData !== null && wishlistData > 0 ? (
            <View className="absolute right-[1px] top-[-4px] bg-red-500 rounded-full  h-[17px] w-[17px] items-center flex justify-center">
              <Text className="text-[11px] text-center text-white">
                {wishlistData}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          className="relative bg-white  p-2.5 rounded-full"
          onPress={() => navigation.navigate('Cart')}>
          <FastImage
            source={icons.cart}
            className="w-[20px] h-[20px]"
            tintColor="black"
          />

          {data?.length > 0 ? (
            <View className="absolute right-[1px] top-[-4px] bg-red-500 rounded-full  h-[17px] w-[17px] items-center flex justify-center">
              <Text className="text-[11px] text-center text-white">
                {data.length}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
