import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CategoryCards from './CategoryCards';

export default function HomeScreen(props) {
  const { navigation } = props;
  const [mother, setMother] = useState({})
  const [category,setCategory]=useState([])

  useEffect(() => {
    console.log("Use effect called")
    const fn = async () => {
      const valueNIK = await AsyncStorage.getItem(`nik`);
      if (valueNIK) {
        try {
          const result = await axios.get("http://192.168.0.113:3000/category");
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
        navigation.navigate('Login');
      }

    }

    fn();

  }, [])

  const navigateToDetail = (event=>{
    //console.log(data);
    //navigation.navigate('Detail',{item:event});
    const fn = async () => {
      const value = await AsyncStorage.setItem(`detailArticle`,event+'');
      console.log(event);
      //navigation.navigate('Detail',{item:event});
      navigation.navigate('Articles',{item:event});
    }
    
     fn();
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{fontSize: 32}}>Categories</Text>
      { category!=[]? <FlatList
            horizontal={true}
            data={category}
            renderItem={({item})=><CategoryCards item={item} getDetail={navigateToDetail} ></CategoryCards>}
            keyExtractor={(item)=>item.id}
            
        ></FlatList> : <Text>Loading</Text>
          }
    </View>
  );
}