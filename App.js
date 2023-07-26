import React, {useState, useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './components/SplashScreen';
const Stack = createNativeStackNavigator();
import {
  OnBoarding,
  SignIn,
  SignUp,
  Otp,
  ForgotPassword,
  NewPassword,
  ProductDetails,
  Account,
  Message,
  Cart,
  Checkout,
  Payment,
  OrderSuccess,
  Orders,
  MyOrders,
  Paid,
  Unpaid,
  Derivered,
  Cancelled,
  ToBeShipped,
  Shipped,
  TrackOrder,
  WishList,
  Category,
} from './screens';
import DrawerNav from './navigation/drawer/drawer1/DrawerNav1';
import {ToastProvider} from 'react-native-toast-notifications';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load resources and data in the background
        await Promise.all([]);

        // Check if this is the app's first launch
        const FirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
        if (FirstLaunch === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('isFirstLaunch', 'false');
        }

        // Set isLoading to false
        setTimeout(() => {
          setIsLoading(false);
        }, 3500);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NativeBaseProvider>
      <ToastProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={'white'}
        />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {isFirstLaunch ? (
              <Stack.Screen
                name="onBoardingScreen"
                component={OnBoarding}
                options={{headerShown: false}}
              />
            ) : null}

            <Stack.Screen
              name="DrawerNav"
              component={DrawerNav}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Account"
              component={Account}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Message"
              component={Message}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderSuccess"
              component={OrderSuccess}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Orders"
              component={Orders}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyOrders"
              component={MyOrders}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Paid"
              component={Paid}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Unpaid"
              component={Unpaid}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Derivered"
              component={Derivered}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cancelled"
              component={Cancelled}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ToBeShipped"
              component={ToBeShipped}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Shipped"
              component={Shipped}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TrackOrder"
              component={TrackOrder}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="WishList"
              component={WishList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Category"
              component={Category}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </NativeBaseProvider>
  );
}
