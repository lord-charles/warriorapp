import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../checkout/Header';

import {
  Unpaid,
  Paid,
  Derivered,
  Cancelled,
  ToBeShipped,
  Shipped,
} from '../index';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import axios from 'axios';
import config from '../../utils/axiosconfig';
import {base_url} from '../../utils/baseUrl';
import {useFocusEffect} from '@react-navigation/native';
import Badge from './Badge';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIwMDI1ZDJmYWQ2OWIwNzM3MDBhYjgiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODYzMTIwMTEsImV4cCI6MTc3MjcxMjAxMX0.r_KLvrWa-BotpCsysEUbRs2iccwetr4SXQ4OcuOqKCA';

const MyOrders = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();
  const [paidCount, setPaidCount] = useState(null);
  const [unPaidCount, setUnPaidCount] = useState(null);
  const [ToBeShippedCount, setToBeShippedCount] = useState(null);
  const [DeliveredCount, setDeliveredCount] = useState(null);
  const [CancelledCount, setCancelledCount] = useState(null);
  const [DispactchedCount, setDispactchedCount] = useState(null);

  const badgeData = {
    paidCount,
    unPaidCount,
    ToBeShippedCount,
    DeliveredCount,
    CancelledCount,
    DispactchedCount,
  };

  const getPaidOrders = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Not Processed',
        },
        config(token),
      );
      // console.log(response.data);
      setPaidCount(response.data.length);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getUnPaidOrders = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Cash on Delivery',
        },
        config(token),
      );
      // console.log(response.data);
      setUnPaidCount(response.data.length);
    } catch (err) {
      // console.log(err);
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getToBeShippedOrders = async () => {
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
      setToBeShippedCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getShippedOrders = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Dispatched',
        },
        config(token),
      );
      setDispactchedCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getDeliveredOrders = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Delivered',
        },
        config(token),
      );
      setDeliveredCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  const getCancelledOrders = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers,
      });

      const response = await api.post(
        'user/orders/',
        {
          status: 'Cancelled',
        },
        config(token),
      );
      setCancelledCount(response.data.length);
    } catch (err) {
      if (err.response.data.message === 'No orders found for user') {
        console.log(err.response.data.message);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPaidOrders();
      getUnPaidOrders();
      getToBeShippedOrders();
      getShippedOrders();
      getDeliveredOrders();
      getCancelledOrders();

      return () => {};
    }, []),
  );

  return (
    <View className="flex-1">
      <Header navigation={navigation} title="My Orders" />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabelStyle: {fontSize: 8},
          tabBarStyle: {backgroundColor: 'white'},
          tabBarActiveTintColor: '#020a3b',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {backgroundColor: '#020a3b'},
          tabBarBadge: () => {
            return <Badge badgeData={badgeData} route={route} />;
          },
          tabBarIcon: () => {
            let iconName;

            if (route.name === 'Unpaid') {
              iconName = icons.Unpaid;
            } else if (route.name === 'Paid') {
              iconName = icons.paid;
            } else if (route.name === 'To be Shipped') {
              iconName = icons.shipping3;
            } else if (route.name === 'Shipped') {
              iconName = icons.shipped;
            } else if (route.name === 'Delivered') {
              iconName = icons.cash_on_delivery;
            } else if (route.name === 'Cancelled') {
              iconName = icons.cancel;
            }

            // Return the desired icon component
            return (
              <FastImage source={iconName} className="w-[20px] h-[20px]" />
            );
          },
        })}>
        <Tab.Screen name="Unpaid" component={Unpaid} />
        <Tab.Screen name="Paid" component={Paid} />
        <Tab.Screen name="To be Shipped" component={ToBeShipped} />
        <Tab.Screen name="Shipped" component={Shipped} />
        <Tab.Screen name="Delivered" component={Derivered} />
        <Tab.Screen name="Cancelled" component={Cancelled} />
      </Tab.Navigator>
    </View>
  );
};

export default MyOrders;
