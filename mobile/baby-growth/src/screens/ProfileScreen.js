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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: "#FFC0CB" }}>
    <Image style={styles.image} source={require('../../assets/logoedit.png')} />
    <Text style={{ color: 'white' }}>Hello {mother.name}</Text>
      <Text style={{ color: 'white' }}>Your address: {mother.address}</Text>
      <Text style={{ color: 'white' }}>Your NIK: {mother.NIK}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFC0CB",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: '20%',
    height: '10%'
  },
 
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#0f5f5c",
  },
});
