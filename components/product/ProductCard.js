import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-ratings';
import {icons} from '../../constants';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {useToast} from 'react-native-toast-notifications';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const ProductCard = ({product, navigation, getWishlistProducts}) => {
  const toast = useToast();

  const addToWishlist = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const res = await api.put(
        'products/wishlist/',
        {
          prodId: product._id,
        },
        config(token),
      );
      if (res.data.added) {
        return (
          toast.show(`${product.title} added to wishlist`, {
            type: 'success',
            placement: 'top',
            duration: 2000,
            offset: 30,
            animationType: 'slide-in',
          }),
          getWishlistProducts ? getWishlistProducts() : null
        );
      } else {
        toast.show(`${product.title} removed from wishlist`, {
          type: 'danger',
          placement: 'top',
          duration: 2000,
          offset: 30,
          animationType: 'slide-in',
        }),
          getWishlistProducts();
      }
    } catch (error) {
      console.error(error);
      toast.show('retry', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  };

  return (
    <View className="flex items-center p-1">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {
            id: product._id,
          })
        }>
        <Image
          source={{uri: product.images[0].url}}
          className="w-[120px] h-[120px]"
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Text className="text-black text-[13px] mt-3">
        {product.description.slice(0, 24)}
        {product.description.length > 24 ? '...' : ''}
      </Text>
      <Text className="text-black text-[15px] font-bold text-center mt-[5px]">
        Ksh {Math.floor(product.price).toLocaleString()}
      </Text>

      <View className="flex flex-row space-x-9 items-center">
        <Rating
          type="custom"
          ratingColor="#020a3b"
          ratingBackgroundColor="#c8c7c8"
          ratingCount={5}
          imageSize={15}
          readonly
          style={{paddingVertical: 5}}
          startingValue={3}
        />
        <TouchableOpacity onPress={() => addToWishlist()}>
          <Image
            source={icons.addtofav}
            className="w-[20px] h-[20px]"
            resizeMode="contain"
            alt="rating icon"
            style={{tintColor: 'black'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
