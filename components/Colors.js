import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ColorComponent = ({color, setSelectedColor, selectedColor}) => {
  return (
    <View>
      <TouchableOpacity
        className={`w-[74px]  h-[50px] rounded-md border-2 items-center justify-center`}
        style={{
          borderColor: color.code,
          backgroundColor: selectedColor == color.name ? '#020a3b' : 'white',
        }}
        onPress={() => {
          setSelectedColor(color.name);
        }}>
        <Text
          className={`${
            selectedColor === color.name ? 'text-white' : 'text-black'
          } capitalize`}>
          {color.name}
        </Text>
        <Text
          className={`${
            selectedColor === color.name ? 'text-white' : 'text-black'
          }  text-[11px] `}>
          in Stock:{color.availability}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ColorComponent;
