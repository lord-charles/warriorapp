import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  Image,
  Animated,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';

import {COLORS, constants, images, SIZES, icons} from '../../constants';
import NextButton from './NextButton';

const OnBoarding = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current; // for dot animation

  const FlatListRef = React.useRef(0);

  // now we need to keep track of which page we are in so that we can render (LETS GET STARTED) button
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const onViewChangeRef = React.useRef(({viewableItems, changed}) => {
    setCurrentIndex(viewableItems[0].index);
  });

  const styles = StyleSheet.create({
    customFont: {
      fontFamily: 'serif',
    },
  });

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View className="items-center flex-row  justify-center gap-x-3  relative top-[55px]">
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.gray, COLORS.red, COLORS.gray],
            extrapolate: 'clamp',
          });
          //for dot animation

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 9, 6],
            extrapolate: 'clamp',
          });
          const dotHeight = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [6, 9, 6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              className="rounded-full"
              style={{
                backgroundColor: 'white',
                width: dotWidth,
                height: dotHeight,
              }}
            />
          );
        })}
      </View>
    );
  };

  function renderHeaderlogo() {
    return (
      <View
        className="items-center z-[999] relative top-[-25px] h-[200px]"
        style={{backgroundColor: '#020a3b'}}>
        <FastImage
          source={icons.warriorlogo}
          className="w-[250px] h-[270px]"
          resizeMode="stretch"
          alt="logo"
        />
      </View>
    );
  }
  function renderFooter() {
    return (
      <View style={{backgroundColor: '#020a3b'}}>
        <View className="relative top-[-210px]">
          <Dots />
        </View>

        {/* skip & Next button  */}
        {currentIndex < constants.onboarding_screens.length ? (
          <TouchableOpacity
            className="items-center relative top-[-75px]"
            onPress={() => {
              let index = Math.ceil(Number(scrollX._value / 600));
              if (index < constants.onboarding_screens.length - 1) {
                //scroll to the next page
                FlatListRef?.current?.scrollToIndex({
                  index: index + 1,
                  Animated: true,
                });
              } else {
                navigation.navigate('DrawerNav');
              }
            }}>
            <NextButton
              percentage={
                (currentIndex + 1) * (100 / constants.onboarding_screens.length)
              }
              currentIndex={currentIndex}
              navigation={navigation}
            />
          </TouchableOpacity>
        ) : (
          <View className="mx-5 mt-[-50px] items-center relative top-[-14px]">
            <TouchableOpacity>
              <Text
                className="text-black font-extrabold text-[25px] bg-red-600 py-2 px-[91px] rounded-lg"
                style={styles.customFont}>
                Let's Get Started
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
      className="h-full"
      style={{backgroundColor: '#020a3b'}}>
      {/* renderHeaderlogo */}
      {renderHeaderlogo()}

      <Animated.FlatList
        ref={FlatListRef} //useful when clecking next to move to next slide
        horizontal
        pagingEnabled //displays each image on its own page
        data={constants.onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment="center" // snapss on a page
        showsHorizontalScrollIndicator={false}
        white
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )} // for dot animation
        onViewableItemsChanged={onViewChangeRef.current} //helps me which page am on
        renderItem={({item}) => {
          return (
            <View>
              <View className="relative top-[-4vh]">
                <LottieView
                  source={item.bannerImage}
                  autoPlay
                  loop
                  width={390}
                  height={390}
                />
              </View>
              {/* DETAILS */}
              <View className="relative top-[39vh]">
                <View className="items-center  w-screen  relative top-[-58px] bg-transparent">
                  <Text
                    className="font-extrabold text-[23px] text-white text-center  relative top-[90px]"
                    style={styles.customFont}>
                    {item.title}
                  </Text>
                </View>

                <View
                  colors={['transparent', '#131313', '#000000']}
                  className="relative top-[40px]  w-screen h-[110px]">
                  <Text
                    className=" text-[14px] text-white mt-2  text-center px-[10px]
              "
                    style={styles.customFont}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
      {/* renderFooter */}
      {renderFooter()}
    </View>
  );
};

export default OnBoarding;
