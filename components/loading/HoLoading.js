import {Skeleton} from 'native-base';
import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import CountDown from 'react-native-countdown-component';

const HoLoadingFlash = ({products}) => {
  const Array = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return (
    <View className="bg-white m-2 h-[185px] rounded-md">
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
          {/* <CountDown
            until={1000000}
            onFinish={() => alert('finished')}
            onPress={() => alert('hello')}
            size={9}
            digitStyle={{backgroundColor: '#E6E7E8'}}
            digitTxtStyle={{color: 'red'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{m: null, s: null}}
            showSeparator
            separatorStyle={{color: 'red'}}
          /> */}
        </View>
      </View>

      <View>
        <FlatList
          data={Array}
          ItemSeparatorComponent={() => <View className="w-0" />}
          keyExtractor={item => `${item}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}, props) => {
            return (
              <>
                <TouchableOpacity className="bg-white mt-1 mx-2  ">
                  <Skeleton className="w-[110px] h-[100px] rounded-md" />
                  <View className="flex mt-[10px] items-center">
                    <Skeleton className="w-[40px] h-[10px] rounded-full " />
                  </View>
                  <View className="flex mt-[10px] items-center">
                    <Skeleton className="w-[60px] h-[6px] rounded-full " />
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

export default HoLoadingFlash;
