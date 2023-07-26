import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {
  View,
  Text,
  Image,
  RefreshControl,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {HomeCorousel} from '../utils/data';
import FastImage from 'react-native-fast-image';

const Slider = () => {
  const width = Dimensions.get('window').width;

  return (
    <View className="bg-white h-[185px]">
      <View className="relative top-[4px]">
        <Carousel
          loop
          width={width}
          height={215}
          autoPlay={true}
          data={HomeCorousel}
          scrollAnimationDuration={2000}
          mode="parallax"
          // onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item, index}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
              className="mt-[-40px]">
              <FastImage
                source={item.image}
                className="w-[100%] h-[210px] rounded-md"
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Slider;
