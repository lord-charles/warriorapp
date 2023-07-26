import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Deals2 = ({products, navigation}) => {
  //   console.log(products);
  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
    customColor: {
      color: '#e52e04',
    },
  });

  return (
    <View className="bg-white m-2 h-[185px] rounded-md">
      <View className="flex flex-row justify-between mx-2 items-center mt-1">
        <Text
          className="text-black font-bold text-[17px]"
          style={styles.customFont}>
          Get them in 24hours
        </Text>
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
                  className="bg-white mt-2  "
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      id: item._id,
                    })
                  }>
                  <Image
                    source={{uri: item.images[0].url}}
                    alt="image"
                    className="w-[100px] h-[100px]"
                    resizeMode="contain"
                  />
                  <Text className="text-black text-[12px] relative top-[10px]">
                    <Text className="text-black text-[12px] ">
                      {item.description.slice(0, 18)}
                      {item.description.length > 18 ? '...' : ''}
                    </Text>
                  </Text>
                  <Text className="text-black text-[12px] font-bold text-center mt-[10px]">
                    Ksh {Math.floor(item.price).toLocaleString()}
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Deals2;
