import React, { useState, useEffect } from 'react';
import {Button,FlatList,Text,TextInput,View,TouchableHighlight,Image,StatusBar,StyleSheet} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen(props) {
  const {navigation}=props;
  const [mother,setMother]=useState({})

  useEffect(() => {
    console.log("Use effect called")
    const fn = async () => {
      const valueNIK = await AsyncStorage.getItem(`nik`);
      const valueName = await AsyncStorage.getItem(`name`);
      const valueAddress = await AsyncStorage.getItem(`address`);
      if(valueNIK){
        console.log(valueName);
        setMother({address:valueAddress,NIK:valueNIK,name:valueName});
      }else{
        navigation.navigate('Login');
      }
      
    }
  
    fn();

}, [])
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello {mother.name}</Text>
      <Text>Your address: {mother.address}</Text>
      <Text>Your NIK: {mother.NIK}</Text>
    </View>
  );
}