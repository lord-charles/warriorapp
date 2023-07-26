import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Svg, Circle} from 'react-native-svg';
import {icons} from '../../constants';
import {Animated, Easing} from 'react-native';
import FastImage from 'react-native-fast-image';

const {Value, timing} = Animated;

const NextButton = ({percentage, currentIndex, navigation}) => {
  const size = 100;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Value(0)).current;
  const progressRef = useRef(null);

  useEffect(() => {
    timing(progressAnimation, {
      toValue: percentage,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [percentage]);

  const strokeDashoffset = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E6E7E8"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <AnimatedCircle
          ref={progressRef}
          stroke="#F4338F"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />

        <TouchableOpacity
          className="items-center flex justify-center relative top-[20px]"
          onPress={() => navigation.replace('DrawerNav')}>
          <View className="bg-gray-100  rounded-full h-[60px] w-[60px] items-center justify-center">
            {currentIndex !== 2 ? (
              <FastImage
                source={icons.right_arrow2}
                className="w-[31px] h-[20px] "
                tintColor={'#020a3b'}
                resizeMode="contain"
              />
            ) : (
              <FastImage
                source={icons.go}
                className="w-[50px] h-[50px]"
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    animationName: 'pulse',
    animationDuration: '1s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
  },
});

export default NextButton;
