import React from 'react';
import {View, Text} from 'react-native';

const Badge = ({badgeData, route}) => {
  const {
    paidCount,
    unPaidCount,
    ToBeShippedCount,
    DeliveredCount,
    CancelledCount,
    DispactchedCount,
  } = badgeData;
  return (
    <View>
      {paidCount !== null && route.name === 'Paid' ? (
        <Text className="text-white text-[10px] bg-red-400 p-[4px] rounded-full text-center w-[18px] h-[18px]">
          {paidCount}
        </Text>
      ) : unPaidCount !== null && route.name === 'Unpaid' ? (
        <Text className="text-white text-[10px] bg-red-400 p-[4px] rounded-full text-center w-[18px] h-[18px]">
          {unPaidCount}
        </Text>
      ) : DispactchedCount !== null && route.name === 'Shipped' ? (
        <Text className="text-white text-[10px] bg-red-400 p-[4px] rounded-full text-center w-[18px] h-[18px]">
          {DispactchedCount}
        </Text>
      ) : ToBeShippedCount !== null && route.name === 'To be Shipped' ? (
        <Text className="text-white text-[10px] bg-red-400 p-[4px] rounded-full text-center w-[18px] h-[18px]">
          {ToBeShippedCount}
        </Text>
      ) : DeliveredCount !== null && route.name === 'Delivered' ? (
        <Text className="text-white text-[10px] bg-red-400 p-[4px] rounded-full text-center w-[18px] h-[18px]">
          {DeliveredCount}
        </Text>
      ) : CancelledCount !== null && route.name === 'Cancelled' ? (
        <Text className="text-white text-[10px] bg-red-400 p-[4px] rounded-full text-center w-[18px] h-[18px]">
          {CancelledCount}
        </Text>
      ) : null}
    </View>
  );
};

export default Badge;
