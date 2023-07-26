import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import {icons} from '../constants';
import SplashScreen from 'react-native-splash-screen';
import FastImage from 'react-native-fast-image';

const styles = StyleSheet.create({
  customFont: {
    fontFamily: 'serif',
  },
});

export default function Splash() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View className="h-full w-screen" style={{backgroundColor: '#020a3b'}}>
      <View className="flex flex-col items-center mt-[-20px] ml-[10px]">
        <FastImage
          source={icons.warriorlogo2}
          className="w-[300px] h-[270px]"
          resizeMode="contain"
          tintColor={'white'}
          alt="logo"
        />
        <Text
          className="text-white font-extrabold text-center relative top-[-100px] left-[0px] text-[11px]"
          style={styles.customFont}>
          Be The Brand Be A Warror
        </Text>
      </View>

      <LottieView source={require('../assets/splash6.json')} autoPlay loop />
      <View className="absolute bottom-[20vh] left-[37vw] ">
        <LottieView
          source={require('../assets/loader1.json')}
          autoPlay
          loop
          width={100}
          height={100}
        />
      </View>

      <Text
        className="text-[12px] absolute bottom-3  text-white left-[35%]"
        style={styles.customFont}>
        &copy; {new Date().getFullYear()} FashionWarrior Ltd
      </Text>
    </View>
  );
}
