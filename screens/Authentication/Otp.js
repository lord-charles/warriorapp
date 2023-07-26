import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import {VStack, Box, Center, Button} from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import FastImage from 'react-native-fast-image';

const Otp = ({navigation}) => {
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          return prevTime;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <View>
        <View style={{height: '35%'}}>
          <ImageBackground
            source={images.background_01}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>

        <Center style={{backgroundColor: '#FFFFFF'}} className="relative">
          <View className="absolute top-[-220px] ">
            <View className="flex items-center space-y-2 relative top-[-9vh]">
              <FastImage
                source={icons.warriorlogo}
                className="w-[250px] h-[270px]"
                resizeMode="stretch"
                tintColor="red"
                alt="logo"
              />
            </View>
          </View>
          <Box
            border="1"
            borderRadius="2xl"
            className="h-[56vh] w-[90%] bg-white relative top-[-10vh] shadow-lg shadow-slate-500">
            <VStack space={3} marginTop={5} marginX={7}>
              <View className="flex items-center">
                <FastImage
                  source={images.enterotp}
                  resizeMode="contain"
                  alt="forgot passoword"
                  resizeMode={FastImage.resizeMode.contain}
                  className="w-[250px] h-[250px]"
                />
              </View>
              <View>
                <Text
                  className="text-center text-black mt-1"
                  style={styles.customFont}>
                  Please enter the 4 digit code sent to your gmail address
                </Text>
              </View>

              <View className="flex items-center">
                <OTPInputView
                  style={{width: '80%', height: 40}}
                  pinCount={4}
                  autoFocusOnLoad
                  codeInputFieldStyle={{
                    ...styles.underlineStyleBase,
                    color: 'black',
                    fontSize: 20,
                  }}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                />
                <TouchableOpacity>
                  <Text
                    className="underline text-black italic text-[13px] relative top-[10px]"
                    style={styles.customFont}>
                    Re-send code
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Button
                  mt={3}
                  colorScheme="red"
                  disabled={false}
                  onPress={() => navigation.navigate('NewPassword')}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Verify
                  </Text>
                </Button>
              </TouchableOpacity>
            </VStack>
          </Box>
        </Center>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: 'red',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  customFont: {
    fontFamily: 'serif',
  },
});

export default Otp;
