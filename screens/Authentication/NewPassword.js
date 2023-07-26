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
import {VStack, Box, Center, Button, FormControl, Input} from 'native-base';
import FastImage from 'react-native-fast-image';

const NewPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  console.log(confirmPasswordError);

  const handlePasswordChange = value => {
    setPassword(value);
    if (value.length < 6) {
      setConfirmPasswordError('Password must contain at least 6 characters');
    } else {
      setConfirmPasswordError('');
    }
  };
  const handleConfirmPasswordChange = value => {
    setConfirmPassword(value);
    if (confirmPassword !== '' && value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
                className="text-red-500 font-sans font-bold text-[17px] top-[-9vh] relative right-2"
                style={styles.customFont}>
                Create New Password
              </Text>
            </View>
          </View>
          <Box
            border="1"
            borderRadius="2xl"
            className="h-[62vh] w-[90%] bg-white relative top-[-8vh] shadow-lg shadow-slate-500">
            <VStack space={3} marginX={7}>
              <View className="flex items-center">
                <FastImage
                  source={images.resetpassword}
                  resizeMode="contain"
                  alt="forgot passoword"
                  resizeMode={FastImage.resizeMode.contain}
                  className="w-[280px] h-[280px]"
                />
              </View>

              <View className="relative top-[-30px]">
                <FormControl isRequired>
                  <FormControl.Label>
                    <Text
                      className="text-red-600 font-bold"
                      style={styles.customFont}>
                      New Password
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Enter password"
                    onChangeText={handlePasswordChange}
                    value={password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                    borderColor="red.600"
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
                </FormControl>

                <FormControl isRequired className="pb-[10px]">
                  <FormControl.Label>
                    <Text
                      className="text-red-600 font-bold"
                      style={styles.customFont}>
                      Confirm Password
                    </Text>
                  </FormControl.Label>
                  <Input
                    placeholder="Confirm password"
                    onChangeText={handleConfirmPasswordChange}
                    value={confirmPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    returnKeyType="done"
                    borderColor="red.600"
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
                </FormControl>
                <View>
                  {confirmPasswordError.length > 0 ? (
                    <Text
                      className="text-red-600 text-[13px] italic"
                      style={styles.customFont}>
                      {confirmPasswordError} !
                    </Text>
                  ) : null}
                </View>
              </View>

              <TouchableOpacity className="relative top-[-20px]">
                <Button
                  colorScheme="red"
                  disabled={false}
                  onPress={() => navigation.navigate('Otp')}>
                  <Text
                    style={styles.customFont}
                    className="text-white font-bold text-[16px]">
                    Save Password
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

export default NewPassword;
