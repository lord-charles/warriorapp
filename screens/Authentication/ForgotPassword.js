import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {icons, images} from '../../constants';
import {
  VStack,
  Box,
  Divider,
  Center,
  FormControl,
  Input,
  Button,
} from 'native-base';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setisEmail] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [countryCode, setCountryCode] = useState('US'); // Set the default country code

  const [emailError, setEmailError] = useState('');

  const handleEmailChange = value => {
    setEmail(value);
    if (value.trim() === '') {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };

  const onSelect = country => {
    setCountryCode(country.cca2);
  };

  const handlePhoneNumberChange = value => {
    setPhoneNumber(value);
    if (value.trim() === '') {
      setPhoneNumberError('Phone number is required');
    } else if (!/^(0|7)[0-9]{8}$/.test(value)) {
      setPhoneNumberError('Phone number is invalid');
    } else {
      setPhoneNumberError('');
    }
  };

  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowLoginMethod = () => {
    setisEmail(!isEmail);
  };

  const handleSignIn = () => {
    // Perform sign in action
  };

  const isEnableSignIn = () => {
    return (
      ((email !== '' && emailError === '') ||
        (phoneNumber !== '' && phoneNumberError === '')) && // check if either email or phone number is not empty and does not have errors
      password !== '' // check if password is not empty
    );
  };

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
            <View className="flex items-center space-y-2 relative top-[-10vh]">
              <FastImage
                source={icons.warriorlogo}
                className="w-[250px] h-[270px]"
                resizeMode="stretch"
                tintColor="red"
                alt="logo"
              />
              <Text
                className="relative top-[-9vh] right-2 font-sans font-bold text-[16px] text-red-500"
                style={styles.customFont}>
                Forget Password!
              </Text>
            </View>
          </View>
          <Box
            border="1"
            borderRadius="2xl"
            className="h-[56vh] w-[90%] bg-white relative top-[-8vh] shadow-lg shadow-slate-500">
            <VStack space={3} marginTop={5} marginX={7}>
              <View className="flex items-center">
                <FastImage
                  source={images.ForgotPassword}
                  resizeMode="contain"
                  alt="forgot passoword"
                  resizeMode={FastImage.resizeMode.contain}
                  className="w-[250px] h-[250px]"
                />
              </View>

              <FormControl isRequired isInvalid={emailError !== ''}>
                {isEmail ? (
                  <>
                    <FormControl.Label>
                      <Text
                        className="text-red-600 font-bold"
                        style={styles.customFont}>
                        Email
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder={'Enter your email'}
                      onChangeText={handleEmailChange}
                      value={email}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      className="text-black text-[14px]"
                      borderColor="red.600"
                    />
                    <View className="flex flex-row items-center justify-between ">
                      <View>
                        {emailError !== '' && (
                          <FormControl.ErrorMessage>
                            <Text className="">{emailError}</Text>
                          </FormControl.ErrorMessage>
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={handleShowLoginMethod}
                        className="relative  top-[3px]">
                        <Text
                          className="text-red-600 italic text-[13px] mt-1 underline text-right"
                          style={styles.customFont}>
                          or, Phone number
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <FormControl isRequired isInvalid={phoneNumberError !== ''}>
                    <FormControl.Label>
                      <Text
                        className="text-red-600 font-bold"
                        style={styles.customFont}>
                        Phone Number
                      </Text>
                    </FormControl.Label>
                    <Input
                      placeholder="Enter your phone number"
                      onChangeText={handlePhoneNumberChange}
                      value={phoneNumber}
                      keyboardType="numeric"
                      returnKeyType="done"
                      borderColor="red.600"
                      className="text-black text-[14px]"
                      InputLeftElement={
                        <View>
                          <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withCountryNameButton={false} // Set withCountryNameButton to false
                            withAlphaFilter
                            withCallingCode={true}
                            withEmoji
                            onSelect={onSelect}
                            visible={false}
                            renderFlagButton={() => (
                              <View className="flex flex-row items-center ml-[5px]">
                                <FlagButton countryCode="KE" withEmoji />
                                <Text className="text-red-600 font-semibold">
                                  +254
                                </Text>
                              </View>
                            )}
                          />
                        </View>
                      }
                    />

                    <View className="flex flex-row items-center justify-between ">
                      {phoneNumberError !== '' && (
                        <FormControl.ErrorMessage>
                          {phoneNumberError}
                        </FormControl.ErrorMessage>
                      )}
                      <TouchableOpacity
                        onPress={handleShowLoginMethod}
                        className="relative left-[238px] top-[3px]">
                        <Text
                          className="text-red-600 italic text-[13px] mt-1 underline text-right"
                          style={styles.customFont}>
                          or, use Email
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </FormControl>
                )}
              </FormControl>

              <TouchableOpacity>
                <Button
                  mt={2}
                  colorScheme="red"
                  disabled={false}
                  onPress={() => navigation.navigate('Otp')}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Send Code
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
  customFont: {
    fontFamily: 'serif',
  },
});

export default ForgotPassword;
