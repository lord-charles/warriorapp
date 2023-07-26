import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Categories} from '../utils/data';
import FastImage from 'react-native-fast-image';

const MajorCategories = () => {
  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
    customColor: {
      color: '#e52e04',
    },
  });
  return (
    <View className="mb-2 bg-white p-2 rounded-md">
      <FlatList
        data={Categories}
        keyExtractor={item => `${item._id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-2.5" />}
        renderItem={({item}, props) => {
          return (
            <>
              <TouchableOpacity className="flex space-y-1 items-center">
                <FastImage
                  source={item.image}
                  resizeMode={FastImage.resizeMode.cover}
                  className="w-[60px] h-[60px] rounded-full"
                />
                <Text
                  className="text-center text-black text-[12px]"
                  style={styles.customFont}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
};

export default MajorCategories;
