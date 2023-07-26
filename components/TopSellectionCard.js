import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const TopSellectionCard = ({item}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} className="p-2">
      <View className="flex items-center mb-[25px]">
        <Image
          source={item.image}
          className="w-[180px] h-[110px]"
          resizeMode="contain"
        />
      </View>

      {/* footer */}
      <View className="relative top-[-25px] items-center">
        <Text className="text-md font-bold  text-black leading-5">Iphone</Text>

        <Text className="text-lg font-bold  text-black leading-5">ksh 500</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TopSellectionCard;
