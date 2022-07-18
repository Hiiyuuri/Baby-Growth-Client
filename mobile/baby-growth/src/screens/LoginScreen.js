import { StatusBar } from "react-native";
import React, { useState } from "react";
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
 import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../config/config';
export default function LoginScreen(props) {
    const {navigation}=props;
    const [isLoading,setLoading]=useState(false);
  const [nik, setNik] = useState("");
 

const onClickedItems = async (event) => {
      
};

const getData=(loginInfo)=>{
  // let res = await fetch("https://restaurant-server-p3-challenge.herokuapp.com/menu");
  // res= res.json()
  // console.log(res);
  // console.log(loginInfo);
  const fn = async () => {
    const valueNIK = await AsyncStorage.setItem(`nik`,loginInfo.NIK);
    const valueName = await AsyncStorage.setItem(`name`,loginInfo.name);
    const valueAddress = await AsyncStorage.setItem(`address`,loginInfo.address);
    navigation.navigate('Home');
  }

  fn();
  
}

const onLogin = (event => {
  // console.log(nik)
  
  const fn = async () => {
    try{
      const result = await axios.post(url+"/nik",{nik:nik},{});
      if(result){
        // console.log(result.data);
        getData(result.data);
      }else{
        console.log("Error found")
      }
      
    }catch(error){
      console.log(error)
    }
    
  }
  fn();

})

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/logoedit.png')} />
      <Text>Masukan NIK untuk menggunakan aplikasi</Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="NIK"
          placeholderTextColor="#003f5c"
          onChangeText={(nik) => setNik(nik)}
        />
      </View>
 
      { //data!=undefined?  getData(data.login) : <Text></Text>

      }
 
      <TouchableOpacity style={styles.loginBtn}>
        <Button onPress={onLogin} title="Masuk"/>
      </TouchableOpacity>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
    width: '20%',
    height: '10%'
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
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
    backgroundColor: "#FF1493",
  },
});