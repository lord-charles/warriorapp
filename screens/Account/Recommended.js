import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, FlatList, RefreshControl} from 'react-native';
import axios from 'axios';
import {base_url} from '../../utils/baseUrl';
import {Spinner} from 'native-base';

import {ProductCard} from '../../components';

const Recommended = ({navigation}) => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [limit, setLimit] = useState(1);
  const [fastReflesh, setFastReflesh] = useState(1);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFastReflesh(fastReflesh + 1);
  }, []);

  const getallProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${base_url}products?page=${limit}&limit=12&fields=description,price,title,images,-category,-brand,-colors`,
      );
      setPopularProducts(prevPopularProducts => [
        ...prevPopularProducts,
        ...res.data.data,
      ]);

      setRefreshing(false);

      res.data.limit * res.data.page >= res.data.totalProducts
        ? setEnd(true)
        : null;
      res.data.success ? setLoading(false) : null;
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);

    getallProducts();
  }, [limit, fastReflesh]);

  return (
    <View>
      <FlatList
        data={popularProducts}
        removeClippedSubviews={true}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 8,
          alignItems: 'center',
        }}
        keyExtractor={item => `${item._id}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['red', 'green', 'blue', 'orange']}
            style={{backgroundColor: 'transparent'}}
            tintColor="transparent" //iso
          />
        }
        renderItem={({item}, props) => {
          return (
            <>
              <View className="bg-white mt-1 rounded-[5px] w-[49.4%]">
                <ProductCard product={item} navigation={navigation} />
              </View>
            </>
          );
        }}
        ListFooterComponent={
          <>
            {end ? (
              <Text className="text-black  text-[14px] text-center">
                No more products!
              </Text>
            ) : (
              <View>
                {loading ? (
                  <View className="flex flex-row space-x-2 items-center pb-1 justify-center">
                    <Spinner color="warning.500" />
                    <Text className="text-black  text-[17px]">
                      loading more products....
                    </Text>
                  </View>
                ) : null}
              </View>
            )}
          </>
        }
        onEndReached={() => {
          setLoading(true);
          setLimit(prevLimit => prevLimit + 1);
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default Recommended;
