import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, TouchableHighlight, Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen(props) {
  const { navigation } = props;
  const [mother, setMother] = useState({})

  const ubahPassword = (event) => {
    navigation.navigate('ChangePassword');
  }

  useEffect(() => {
    const fn = async () => {
      const valueNIK = await AsyncStorage.getItem(`nik`);
      const valueName = await AsyncStorage.getItem(`name`);
      const valueAddress = await AsyncStorage.getItem(`address`);
      if (valueNIK) {
        setMother({ address: valueAddress, NIK: valueNIK, name: valueName });
      } else {
        navigation.navigate('Logout');
      }
    }
    fn();
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#008080" }}>
      <Image style={styles.image} source={require('../../assets/logoedit.png')} />
      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Halo Ibu {mother.name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: 4 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left', color: 'white', marginBottom: 10 }}>Alamat Anda</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'left', color: 'white' }}>NIK Anda</Text>
        </View>
        <View style={{ marginRight: 4 }}>
          <Text style={{ fontSize: 18, textAlign: 'left', color: 'white', marginBottom: 10 }}>: {mother.address}</Text>
          <Text style={{ fontSize: 18, textAlign: 'left', color: 'white' }}>: {mother.NIK}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={ubahPassword} style={styles.loginBtn}>
        <Text style={{ color: 'white' }}>Ganti Password</Text>
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
