import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CategoryCards from './CategoryCards';
import url from '../config/config';
export default function HomeScreen(props) {
  const { navigation } = props;
  const [mother, setMother] = useState({})
  const [category,setCategory]=useState([])
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

  // useEffect(() => {
    

  // },[])

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "#008080" }}>
    <Text style={{fontSize: 32,color:'white'}}>Categories</Text>
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