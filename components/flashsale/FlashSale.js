import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';
import * as Progress from 'react-native-progress';

const FlashSale = ({products, navigation}) => {
  return (
    <View className="bg-white mx-2 mb-2 h-[185px] rounded-md">
      <View className="flex flex-row justify-between mx-2 items-center mt-1">
        <Image
          source={require('../../assets/images/flash.webp')}
          alt="image flash"
          className="w-[100px] h-[20px]"
          resizeMode="contain"
        />
        <View className="flex flex-row items-center">
          <Text className="text-black text-[13px] font-semibold">
            Ends in :
          </Text>
          <CountDown
            until={1000000}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={9}
            digitStyle={{backgroundColor: '#E6E7E8'}}
            digitTxtStyle={{color: '#020a3b'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
            separatorStyle={{color: '#020a3b'}}
          />
        </View>
      </View>

      <View>
        <FlatList
          data={products}
          ItemSeparatorComponent={() => <View className="w-6" />}
          keyExtractor={item => `${item._id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}, props) => {
            return (
              <>
                <TouchableOpacity
                  className="bg-white mt-1 items-center space-y-1"
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      id: item.productId._id,
                    })
                  }>
                  <Image
                    source={{uri: item.productId?.images[0].url}}
                    alt="image"
                    className="w-[100px] h-[100px]"
                    resizeMode="contain"
                  />
                  <Text className="text-[#020a3b] text-[12px] font-bold text-center mt-[10px]">
                    Ksh{' '}
                    {Math.floor(
                      item.productId.price -
                        item.productId.price * (item.discountPercentage / 100),
                    ).toLocaleString()}
                  </Text>
                  <View>
                    <View>
                      <Text className="text-gray-500 text-[10px] text-center">
                        Units left: {item.quantity}
                      </Text>
                    </View>
                    <Progress.Bar
                      progress={(item.quantity / 2000) * 100}
                      width={90}
                      height={4}
                      className="text-red-500"
                      color="#020a3b"
                    />
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

export default FlashSale;
