import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants';

const DrawerItem = () => {
  return (
    <>
      <View>
        <Text>Inbox</Text>
      </View>
    </>
  );
};

const ProjectItem = () => {
  return <></>;
};

const ProfileItem = () => {
  return <></>;
};

const CustomDrawer1 = props => {
  const {state, description, navigation} = props;
  return (
    <View style={styles.container}>
      <View className="items-center mt-[35px] flex space-y-2">
        <View>
          <FastImage
            source={icons.profilePlaceholder}
            className="w-[50px] h-[50px]"
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.customFont} className="font-bold text-white">
          Login/Register
        </Text>
      </View>
      <DrawerContentScrollView
        {...props}
        style={[styles.view, styles.marginvertical, styles.margintop]}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* footer */}
      <View className="items-center relative top-[-5px] flex space-y-1">
        <Text style={styles.customFont} className="text-[10px] text-white">
          App Version 2.11.0
        </Text>
        <Text className="text-[10px]  text-white" style={styles.customFont}>
          &copy; {new Date().getFullYear()} FashionWarrior Ltd
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawer1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  customFont: {
    fontFamily: 'serif',
  },
  view: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: 8,
    padding: 10,
  },
  margintop: {
    marginTop: 0,
  },
  marginbottom: {
    marginBottom: 8,
  },
  marginvertical: {
    marginVertical: 8,
  },
});
