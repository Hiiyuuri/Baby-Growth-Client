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
export default function ChangePasswordScreen(props) {
  const { navigation } = props;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  let needtoRerender = false;
  let access_token = ""
  useFocusEffect(
    React.useCallback(() => {
      needtoRerender = true;
      needtoRerender = false;

      const fn = async () => {
        let temp = await AsyncStorage.getItem(`access_token`);
        if (temp) {
          if (temp != "") {
            access_token = temp;
          }
        }
      }

      fn();
    }, [needtoRerender])
  );

  const onChangePassword = (event => {
    let fn1 = async () => {
      let temp = await AsyncStorage.getItem(`access_token`);
      if (temp) {
        if (temp != "") {
          access_token = temp;
        }
      }
      if (access_token != "") {
        const fn = async () => {
          try {
            const result = await axios.post(url + "/password", { password: password, newPassword: newPassword }, { headers: { access_token } });
            if (result) {
              if (result.status == 204) {
                setHasChanged(true);
              }

            } else {
            }

          } catch (error) {
            alert(error.response.data.message);
          }

        }
        fn();
      }
    }

    fn1();




  })

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 32 }}>Change password</Text>

      {!hasChanged ? <Text style={{ color: 'white' }}>Please input your new password here</Text> :
        <Text style={{ color: 'white' }}>Password has been changed!</Text>}

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="New Password"
          placeholderTextColor="#003f5c"
          onChangeText={(newPassword) => { setNewPassword(newPassword); setHasChanged(false); }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          secureTextEntry={true}
          placeholder="Old Password"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => { setPassword(password); setHasChanged(false); }}
        />
      </View>

      <TouchableOpacity onPress={onChangePassword} style={styles.loginBtn}>
        <Text style={{ color: 'white' }}>Ubah password</Text>
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