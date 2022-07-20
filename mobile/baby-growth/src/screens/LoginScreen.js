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
import { useFocusEffect } from '@react-navigation/native';
import url from '../config/config';
export default function LoginScreen(props) {
  const { navigation } = props;
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  let needtoRerender = false;
  useFocusEffect(
    React.useCallback(() => {
      needtoRerender = true;
      needtoRerender = false;
      const fn = async () => {
        await AsyncStorage.removeItem(`nik`);
        await AsyncStorage.removeItem(`name`);
        await AsyncStorage.removeItem(`address`);
        await AsyncStorage.removeItem(`detailArticle`);
        await AsyncStorage.removeItem(`access_token`);
      }
      fn();
    }, [needtoRerender])
  );

  const getData = (loginInfo) => {
    const fn = async () => {
      const valueNIK = await AsyncStorage.setItem(`nik`, loginInfo.NIK);
      const valueName = await AsyncStorage.setItem(`name`, loginInfo.name);
      const valueAddress = await AsyncStorage.setItem(`address`, loginInfo.address);
      const valueToken = await AsyncStorage.setItem(`access_token`, loginInfo.access_token);
      navigation.navigate('Home');
    }
    fn();

  }

  const onLogin = (event => {
    const fn = async () => {
      try {
        const result = await axios.post(url + "/login", { NIK: nik, password: password }, {});
        if (result) {
          getData(result.data);
        } else {
        }

      } catch (error) {
      }

    }
    fn();

  })

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 32 }}>Baby Growth</Text>
      <Image style={styles.image} source={require('../../assets/logoedit.png')} />
      <Text style={{ color: 'white' }}> </Text>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="NIK"
          placeholderTextColor="#003f5c"
          onChangeText={(nik) => setNik(nik)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity onPress={onLogin} style={styles.loginBtn}>
        <Text style={{ color: 'white' }}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#008080",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    width: '20%',
    height: '20%'
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
    justifyContent: "center",
    alignItems: "center",
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