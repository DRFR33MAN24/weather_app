import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { CustomPagination } from './CustomPagination';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function Ads() {
  const [ads, setads] = useState([]);

  const [loading, setLoading] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setLoading(true);
    axios
      .get('https://orderxgyigfomzitphujkrjr.freeorder.us/api/ads.php?ads')
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setads(response['data']);
        // console.log(response['data']);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log('start');
    setLoading(true);
    axios
      .get('https://orderxgyigfomzitphujkrjr.freeorder.us/api/ads.php?ads')
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setads(response['data']);
        console.log(response['data']);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
        setLoading(false);
      });
  }, []);

  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={5}
      // index={3}
      autoplayLoop
      autoplayInvertDirection
      data={ads}
      renderItem={({ item }) => (
        <View
          style={{
            width: width,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode="stretch"
            style={{
              height: height * 0.25,
              width: '96%',
              borderRadius: 15,
            }}
            source={{
              uri: 'https://orderxgyigfomzitphujkrjr.freeorder.us/photo/ads/' + item.url,
            }}
          />
        </View>
      )}
      showPagination
      PaginationComponent={CustomPagination}
    />
  );
}
