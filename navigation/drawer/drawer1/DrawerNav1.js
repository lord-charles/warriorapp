import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScreensArray} from '../arrays';
import CustomDrawer1 from './CustomDrawer1';
import FastImage from 'react-native-fast-image';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        headerShown: false,
      }}
      drawerContent={props => {
        return <CustomDrawer1 {...props} />;
      }}>
      {ScreensArray.map((_, i) => (
        <Drawer.Screen
          key={i}
          name={_.route}
          component={_.component}
          options={{
            drawerIcon: () => (
              <FastImage
                source={_.icon}
                style={{width: 20, height: 20}}
                tintColor={'white'}
              />
            ),
            swipeEnabled: false,
            overlayColor: 'transparent',
            drawerLabelStyle: {
              color: 'white',
              fontSize: 13,
            },
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  drawerStyles: {
    width: '60%',
    backgroundColor: 'transparent',
  },
});
