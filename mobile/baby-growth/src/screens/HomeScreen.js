import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CategoryCards from './CategoryCards';
import url from '../config/config';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ArticleDetail from './ArticleDetail';
export default function HomeScreen(props) {
  const { navigation } = props;
  const [category, setCategory] = useState([])
  const [article, setArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("");

  let needtoRerender = false;
  useFocusEffect(
    React.useCallback(() => {
      needtoRerender = true;
      needtoRerender = false;
      const fn = async () => {
        const valueNIK = await AsyncStorage.getItem(`nik`);
        if (valueNIK) {
          try {
            const result = await axios.get(url + "/category");
            if (result) {
              setCategory(result.data);
            } else {
            }
          }
          catch (error) {
          }
        }
        else {
          navigation.navigate('Logout');
        }
      }
      navigation.setOptions({ title: "Title" })
      fn();
    }, [needtoRerender])
  );

  useEffect(() => {
    setArticles([]);
    if (selectedCategory != "") {
      const fn = async () => {
        try {
          const result = await axios.get(url + "/category/" + selectedCategory + "/article");
          if (result) {
            setArticles(result.data);
          } else {
            setArticles([]);
          }
        }
        catch (error) {
        }
      }
      fn();
    }
  }, [selectedCategory])

  const navigateToDetail = (event => {
    const fn = async () => {
      setSelectedCategory(event);
    }
    fn();
  })

  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#008080" }}>
        <Text style={{ fontSize: 24, color: 'white' }}>Pilih Kategori dari Artikel</Text>
        {category.length != 0 ? <FlatList
          horizontal={true}
          data={category}
          renderItem={({ item }) => <CategoryCards item={item} getDetail={navigateToDetail} ></CategoryCards>}
          keyExtractor={(item) => item.id}
        ></FlatList> : <Text>Loading</Text>
        }
        {article.length != 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#008080" }}><SwiperFlatList
          showPagination
          data={article}
          renderItem={({ item }) => <ArticleDetail item={item} ></ArticleDetail>}
          keyExtractor={(item) => item.id}
        /></View> : <Text>{selectedCategory == "" ? "Please select a category" : "No article for this category yet"}</Text>
        }
      </View>
    </ScrollView>
  );
}