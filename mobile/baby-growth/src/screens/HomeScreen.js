import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView,Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CategoryCards from './CategoryCards';
import url from '../config/config';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ArticleDetail from './ArticleDetail';
export default function HomeScreen(props) {
  const { navigation } = props;
  const [category,setCategory]=useState([])
  const [article, setArticles] = useState([])
  const [selectedCategory,setSelectedCategory]=useState("");

  let needtoRerender=false;
  useFocusEffect(
    React.useCallback(() => {
      needtoRerender=true;
      console.log("Use effect called")
      needtoRerender=false;
      const fn = async () => {
        const valueNIK = await AsyncStorage.getItem(`nik`);
        console.log(url);
        if (valueNIK) {
          try {
            const result = await axios.get(url+"/category");
            if (result) {
              console.log(result.data);
              setCategory(result.data);
            } else {
              console.log("Error found")
            }
          }
          catch (error) {
            console.log(error);
          }
        }
        else {
          navigation.navigate('Logout');
        }
  
      }
      navigation.setOptions({ title: "Title"})
      fn();
    }, [needtoRerender])
  );

  useEffect(() => {
    console.log("Array navigated"+selectedCategory)
    setArticles([]);
    if(selectedCategory!=""){
      const fn = async () => {
        try {
          const result = await axios.get(url+"/category/"+selectedCategory+"/article");
          if (result) {
            console.log(result.data);
            setArticles(result.data);
          } else {
            setArticles([]);
            console.log("Error found")
          }
        }
        catch (error) {
          console.log(error);
        }
      

    }

    fn();
    }
    

  }, [selectedCategory])
  // useEffect(() => {
    

  // },[])

  const navigateToDetail = (event=>{
    //console.log(data);
    //navigation.navigate('Detail',{item:event});
    const fn = async () => {
      // const value = await AsyncStorage.setItem(`detailArticle`,event+'');
      console.log(event);
      setSelectedCategory(event);
      //navigation.navigate('Detail',{item:event});
      // navigation.navigate('Articles',{item:event});
    }
    
     fn();
  })

  return (
    <ScrollView>
      <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "#008080" }}>
    <Text style={{fontSize: 24,color:'white'}}>Pilih Kategori dari Artikel</Text>
      { category.length!=0? <FlatList
            horizontal={true}
            data={category}
            renderItem={({item})=><CategoryCards item={item} getDetail={navigateToDetail} ></CategoryCards>}
            keyExtractor={(item)=>item.id}
            
        ></FlatList> : <Text>Loading</Text>
          }
    
    
    
      { article.length!=0? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "#008080" }}><SwiperFlatList
      showPagination
      data={article}
            renderItem={({item})=><ArticleDetail item={item} ></ArticleDetail>}
            keyExtractor={(item)=>item.id}
    /></View> : <Text>{selectedCategory==""?"Please select a category":"No article for this category yet"}</Text>
          }
    </View>
    </ScrollView>
  );
}