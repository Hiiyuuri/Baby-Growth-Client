import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ArticleCard from './ArticleCard';
import url from '../config/config';

export default function ArticleScreen({ navigation, route }) {
  const item = route.params.item
  const [article, setArticles] = useState([])

  useEffect(() => {
    console.log("Array navigated"+item)
    const fn = async () => {
        try {
          const result = await axios.get(url+"/category/"+item+"/article");
          if (result) {
            console.log(result.data);
            setArticles(result.data);
          } else {
            console.log("Error found")
          }
        }
        catch (error) {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{fontSize: 32}}>Articles</Text>
      { article!=[]? <FlatList
            data={article}
            renderItem={({item})=><ArticleCard item={item} getDetail={navigateToDetail} ></ArticleCard>}
            keyExtractor={(item)=>item.id}
        ></FlatList> : <Text>Loading</Text>
          }
    </View>
  );
}