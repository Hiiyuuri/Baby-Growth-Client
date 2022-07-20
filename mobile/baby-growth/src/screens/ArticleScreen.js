import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import url from '../config/config';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ArticleDetail from './ArticleDetail';
export default function ArticleScreen({ navigation, route }) {
  const item = route.params.item
  const [article, setArticles] = useState([])
  useEffect(() => {
    console.log("Array navigated"+item)
    setArticles([]);
    const fn = async () => {
        try {
          
          const result = await axios.get(url+"/category/"+item+"/article");
          if (result) {
            setArticles(result.data);
          } else {
            console.log("Error found")
          }
        }
        catch (error) {
          setArticles([]);
          console.log(error);
        }
      

    }

    fn();

  }, [item])

  const navigateToDetail = (event=>{
    // console.log(data);
    navigation.navigate('ArticleDetail',{item:event});
    // console.log(event);
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "#008080" }}>
    <Text style={{fontSize: 32,color: 'white'}}>Articles</Text>
    
      { article.length!=0? <SwiperFlatList
      showPagination
      data={article}
            renderItem={({item})=><ArticleDetail item={item} ></ArticleDetail>}
            keyExtractor={(item)=>item.id}
    /> : <Text>No article for this category yet</Text>
          }
    </View>
  );
}