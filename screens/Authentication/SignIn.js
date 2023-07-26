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
import {VStack, Box, Center, FormControl, Input, Button} from 'native-base';
import CountryPicker, {FlagButton} from 'react-native-country-picker-modal';
import FastImage from 'react-native-fast-image';

const SignIn = ({navigation}) => {
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

  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
  });

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <View>
        <Center style={{backgroundColor: '#FFFFFF'}} className="relative">
          <View className="absolute top-[40px] ">
            <View className="flex items-center space-y-2 relative top-[-8vh]">
              <FastImage
                source={icons.warriorlogo}
                className="w-[250px] h-[270px]"
                resizeMode="stretch"
                tintColor="#020a3b"
                alt="logo"
              />
              <Text
                className="text-black font-sans font-bold text-[16px] relative top-[-8.9vh] right-2"
                style={styles.customFont}>
                Welcome back
              </Text>
            </View>
          </View>
          <Box
            border="1"
            borderRadius="2xl"
            className="h-[60vh] w-[90%] bg-white relative top-[25vh] shadow-lg shadow-slate-500">
            <VStack space={3} marginTop={5} marginX={7}>
              <FormControl isRequired isInvalid={emailError !== ''}>
                {isEmail ? (
                  <>
                    <FormControl.Label>
                      <Text
                        className="text-black font-bold"
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
                          className="text-black italic text-[13px] mt-1 underline text-right"
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
                        className="text-black font-bold"
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
                      borderColor="blue.900"
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
                                <Text className="text-black font-semibold">
                                  +254
                                </Text>
                              </View>
                            )}
                          />
                        </View>
                      }
                    />

                    <View className="flex flex-row items-center justify-between ">
                      <View>
                        {phoneNumberError !== '' && (
                          <FormControl.ErrorMessage>
                            {phoneNumberError}
                          </FormControl.ErrorMessage>
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={handleShowLoginMethod}
                        className="relative left-[238px] top-[3px]">
                        <Text
                          className="text-black italic text-[13px] mt-1 underline text-right"
                          style={styles.customFont}>
                          or, use Email
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </FormControl>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>
                  <Text
                    className="text-black font-bold"
                    style={styles.customFont}>
                    Password
                  </Text>
                </FormControl.Label>
                <Input
                  placeholder="Enter your password"
                  onChangeText={handlePasswordChange}
                  value={password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  returnKeyType="done"
                  borderColor="blue.900"
                  className="text-black text-[14px]"
                  InputRightElement={
                    <View>
                      {!showPassword ? (
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.eye}
                            onPress={handleShowPassword}
                            className="w-[20px] h-[20px] mr-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={handleShowPassword}>
                          <Image
                            source={icons.eye_close}
                            onPress={handleShowPassword}
                            className="w-[20px] h-[20px] mr-[10px]"
                            style={{tintColor: 'black'}}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  }
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                  className="relative  top-[3px]">
                  <Text
                    className="text-black italic text-[13px] mt-1 underline text-right"
                    style={styles.customFont}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </FormControl>
              <TouchableOpacity>
                <Button
                  mt={2}
                  className="bg-blue-900 text-white font-bold"
                  onPress={() => navigation.navigate('DrawerNav')}
                  style={styles.customFont}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Log in
                  </Text>
                </Button>
              </TouchableOpacity>

              <Text
                className="text-center text-gray-600 text-[13px] "
                style={styles.customFont}>
                or, create a new account ?
              </Text>
              <TouchableOpacity>
                <Button
                  mt={2}
                  className="bg-blue-900 text-white font-bold"
                  onPress={() => navigation.navigate('SignUp')}
                  style={styles.customFont}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Sign up
                  </Text>
                </Button>
              </TouchableOpacity>
              <Text
                className="text-center text-gray-600 text-[13px]"
                style={styles.customFont}>
                Log in with
              </Text>
              <View className="flex flex-row space-x-3 justify-center items-center mt-[5px]">
                <TouchableOpacity>
                  <Image
                    source={images.google}
                    className="w-[30px] h-[30px]"
                    alt="image"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={images.facebook}
                    className="w-[30px] h-[30px]"
                    alt="image"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={images.twitter}
                    className="w-[32px] h-[32px]"
                    alt="image"
                  />
                </TouchableOpacity>
              </View>
            </VStack>
          </Box>
        </Center>
      </View>
    </View>
  );
};

export default SignIn;
