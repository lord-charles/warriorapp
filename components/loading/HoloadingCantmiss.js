import {Skeleton} from 'native-base';
import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

const HoLoadingcantmiss = () => {
  const Array = ['1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <View className="bg-white m-2 h-[185px] rounded-md">
      <View className="flex flex-row justify-between mx-2 items-center mt-1">
        <Text className="text-black font-bold text-[17px]">
          Deals you can't miss
        </Text>
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
                    <Skeleton className="w-[90px] h-[10px] rounded-full " />
                  </View>
                  <View className="flex mt-[10px] items-center">
                    <Skeleton className="w-[60px] h-[10px] rounded-full " />
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

export default HoLoadingcantmiss;
