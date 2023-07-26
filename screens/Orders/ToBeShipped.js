import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {base_url} from '../../utils/baseUrl';
import config from '../../utils/axiosconfig';
import LottieView from 'lottie-react-native';
import OrderCard from './OrderCard';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const ToBeShipped = ({navigation}) => {
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState([]);
  const [noData, setnoData] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrders2();
  }, []);

  const getOrders = async () => {
    setDisable(true);

    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Processing',
        },
        config(token),
      );
      // console.log(response.data);
      setData(response.data);
      setDisable(false);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        setnoData(true);
        setDisable(false);
      }
    }
  };

  const getOrders2 = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Processing',
        },
        config(token),
      );
      // console.log(response.data);
      setData(response.data);
      setRefreshing(false);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOrders();

      return () => {};
    }, []),
  );

  return (
    <View className="flex-1">
      {disable ? (
        <View
          className={`absolute top-[28%] left-[34%]
                `}>
          <LottieView
            source={require('../../assets/loader1.json')}
            autoPlay
            loop
            width={150}
            height={150}
          />
        </View>
      ) : noData ? (
        <View
          className={`absolute top-[10%] left-[5%]
              `}>
          <LottieView
            source={require('../../assets/noData.json')}
            autoPlay
            loop
            width={350}
            height={350}
          />
        </View>
      ) : (
        <FlatList
          data={data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item._id}`}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['red', 'green', 'blue', 'orange']}
              style={{backgroundColor: 'transparent'}}
              tintColor="transparent" //iso
            />
          }
          ListHeaderComponent={<></>}
          renderItem={({item}, props) => {
            return (
              <>
                <OrderCard item={item} navigation={navigation} />
              </>
            );
          }}
          ListFooterComponent={<></>}
        />
      )}
    </View>
  );
};

export default ToBeShipped;
