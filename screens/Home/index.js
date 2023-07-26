import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  StyleSheet,
  Animated,
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import Geocoding from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {Categories} from '../../utils/data';
import {
  FlashSale,
  MajorCategories,
  Slider,
  TopSellectionCard,
  Header,
  Deals,
  Deals2,
  TopDeals,
  ProductCard,
  HoLoadingFlash,
  HoLoadingTopDeals,
  In24,
  HoLoadingcantmiss,
} from '../../components';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import {Spinner, Toast} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import {useFocusEffect} from '@react-navigation/native';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const Home = ({navigation}) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [specialProducts, setSpecialProducts] = useState([]);
  const [nonspecialProducts, setnonSpecialProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [FlashSaleProducts, setFlashSaleProducts] = useState([]);
  const [limit, setLimit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [fastReflesh, setFastReflesh] = useState(1);
  const [location, setLocation] = useState('N/A');
  const [city, setCity] = useState('');
  const [wishlistData, setWishlistData] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFastReflesh(fastReflesh + 1);
  }, []);

  // Function to get address from latitude and longitude
  const getAddressFromCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );
      const data = await response.json();
      data.address.city === undefined
        ? setCity(data.address.town)
        : setCity(data.address.city);
      const address = `${data.address.country}`;
      setLocation(address);
      console.log(address);
    } catch (error) {
      console.error(error);
    }
  };

  // Request location permission and get current location
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            getAddressFromCoords(latitude, longitude);
          },
          error => console.error(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const featuredData = async () => {
    try {
      const res = await axios.get(
        `${base_url}products?isFeatured=true&limit=10&fields=description,price,images,-category,-brand,-colors`,
      );
      setRefreshing(false);

      setFeaturedProducts(res.data.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const specialData = async () => {
    try {
      const res = await axios.get(
        `${base_url}products?isSpecial=true&limit=10&fields=description,price,images,-category,-brand,-colors`,
      );
      setSpecialProducts(res.data.data);
      setRefreshing(false);

      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const nonspecialData = async () => {
    try {
      const res = await axios.get(
        `${base_url}products?isSpecial=false&limit=10&fields=description,price,images,-category,-brand,-colors`,
      );
      setnonSpecialProducts(res.data.data);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getallProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}products?page=${limit}&limit=12&fields=description,title,price,images,-category,-brand,-colors`,
      );
      setPopularProducts(prevPopularProducts => [
        ...prevPopularProducts,
        ...res.data.data,
      ]);

      setRefreshing(false);
      // console.log('done');

      res.data.limit * res.data.page >= res.data.totalProducts
        ? setEnd(true)
        : null;
      res.data.success ? setLoading(false) : null;
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getInActiveFlashSaleProducts = async () => {
    try {
      const response = await axios.get(`${base_url}flashSale/get/inactive/`);
      setRefreshing(false);
      setFlashSaleProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getWishlistProducts = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });
      const response = await api.get(
        `${base_url}user/wishlist/`,
        config(token),
      );
      setWishlistData(response.data.wishlist.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      requestLocationPermission();
      getInActiveFlashSaleProducts();
      featuredData();
      specialData();
      nonspecialData();
    } catch (error) {
      console.error(error);
    }
  }, [fastReflesh]);

  useEffect(() => {
    setLoading(true);
    getallProducts();
  }, [limit, fastReflesh]);

  useFocusEffect(
    useCallback(() => {
      getWishlistProducts();

      return () => {
        // Clean up any subscriptions or resources if needed
      };
    }, []),
  );

  return (
    <>
      <Header navigation={navigation} wishlistData={wishlistData} />
      <View className="bg-white items-center flex flex-row space-x-1 px-3">
        <FastImage
          source={icons.location_pin}
          className="w-[20px] h-[20px]"
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text className="text-black" style={styles.customFont}>
          DELIVERY TO {city}, {location}
        </Text>
        <TouchableOpacity>
          <FastImage
            source={icons.down_arrow}
            className="w-[15px] h-[15px]"
            resizeMode={FastImage.resizeMode.cover}
            tintColor={'red'}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={popularProducts}
        removeClippedSubviews={true}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          alignItems: 'center',
        }}
        keyExtractor={item => `${item._id}`}
        // showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red', 'green', 'blue', 'orange']}
            style={{backgroundColor: 'transparent'}}
            tintColor="transparent" //iso
          />
        }
        ListHeaderComponent={
          <>
            <Slider />
            <MajorCategories />
            {FlashSaleProducts.length > 0 ? (
              <FlashSale products={FlashSaleProducts} navigation={navigation} />
            ) : (
              <HoLoadingFlash />
            )}
            {featuredProducts.length > 0 ? (
              <Deals products={featuredProducts} navigation={navigation} />
            ) : (
              <HoLoadingcantmiss />
            )}
            {specialProducts.length > 0 ? (
              <Deals2 products={specialProducts} navigation={navigation} />
            ) : (
              <In24 />
            )}
            {nonspecialProducts.length > 0 ? (
              <TopDeals products={nonspecialProducts} navigation={navigation} />
            ) : (
              <HoLoadingTopDeals />
            )}
            <Text
              className="text-[17px] text-black font-bold text-center mt-[5px]"
              style={styles.customFont}>
              Top picks for you
            </Text>
          </>
        }
        renderItem={({item}, props) => {
          return (
            <>
              <View className="bg-white mt-1 rounded-[5px] w-[49.4%]">
                <ProductCard
                  product={item}
                  navigation={navigation}
                  getWishlistProducts={getWishlistProducts}
                />
              </View>
            </>
          );
        }}
        ListFooterComponent={
          <>
            {end ? (
              <Text className="text-black  text-[14px] text-center">
                No more products!
              </Text>
            ) : (
              <View>
                {loading ? (
                  <View className="flex flex-row space-x-2 items-center pb-1 justify-center">
                    <Spinner color="warning.500" />
                    <Text className="text-black  text-[17px]">
                      loading more products....
                    </Text>
                  </View>
                ) : null}
              </View>
            )}
          </>
        }
        onEndReached={() => {
          setLoading(true);
          setLimit(prevLimit => prevLimit + 1);
        }}
        onEndReachedThreshold={0.1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
  customColor: {
    color: '#e52e04',
  },
});
export default Home;
