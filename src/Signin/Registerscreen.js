import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ImageBackground, ScrollView } from 'react-native';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../database/firebaseDb";
import { LogBox } from 'react-native';

export default function Registerscreen(props) {
  const [name, setname] = React.useState("");
  const [phone, setphone] = React.useState("");
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [password2, setpassword2] = React.useState("");

  const bg = require('../../assets/first/login2.png');
  const Clear = () => {
    setname("")
    setusername("")
    setpassword("")
    setpassword2("")
    setphone("")
  }
  const UserRegistrationFunction = () => {

    async function addUser() {
      try {
        LogBox.ignoreLogs(['Setting a timer'])
        const docRef = await addDoc(collection(db, "Users"), {
          Username: username,
          Password: password,
          Name: name,
          total: -1,
          aboutme: "ลองระบุสิ่งที่เป็นตัวของตัวเธอเองดูสิ",
          Phone: phone,
          picture: "https://sv1.picz.in.th/images/2022/04/14/82SRhP.png"
        });
      } catch (e) {
        console.error("Error adding User: ", e);
      }
    }
    if (password != password2) {
      Alert.alert("กรุณากรอกรหัสผ่านให้ตรงกัน")
    }
    else if (name === "" || phone === "" || username === "" || password === "" || password2 === "") {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน")
    }
    else {
      addUser();
      Alert.alert("ลงทะเบียนสำเร็จ!");
      Clear();
      props.navigation.navigate("Loginscreen");
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <View style={{ flex: 1.5 }}></View>
        <View style={{ flex: 4 }}>
          <ScrollView>
          <Text style={{ fontSize: 25, color: '#1DA072', marginLeft: 35, fontWeight: 'bold' }}>ลงทะเบียน</Text>
            <View style={{ flex: 7,justifyContent:'center',alignItems:'center'}}>
              <TextInput
                placeholder="👤 กรอกชื่อผู้ใช้"
                onChangeText={setusername}
                value={username}
                underlineColorAndroid='transparent'
                style={styles.TextInputStyleClass}
              />

              <TextInput
                placeholder="🔒 กรอกรหัสผ่าน"
                onChangeText={setpassword}
                value={password}
                underlineColorAndroid='transparent'
                style={styles.TextInputStyleClass}
                secureTextEntry={true}
              />
              <TextInput
                placeholder="🔒 กรอกรหัสผ่านอีกครั้ง"
                onChangeText={setpassword2}
                value={password2}
                underlineColorAndroid='transparent'
                style={styles.TextInputStyleClass}
                secureTextEntry={true}
              />
              <TextInput
                placeholder="👤 กรอกชื่อ-นามสกุล"
                onChangeText={setname}
                value={name}
                underlineColorAndroid='transparent'
                style={styles.TextInputStyleClass}
              />
              <TextInput
                placeholder="☎️ กรอกเบอร์โทร"
                onChangeText={setphone}
                value={phone}
                underlineColorAndroid='transparent'
                style={styles.TextInputStyleClass}
              />
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <TouchableOpacity onPress={UserRegistrationFunction}>
                <View style={styles.button}>
                  <Text style={styles.textbutton}>ลงทะเบียน</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    flex: 2,
    backgroundColor: 'pink',
  },
  button: {
    width: 350,

    backgroundColor: '#24C48B',
    borderRadius: 25,
    shadowColor: "#24C48B",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    margin: 5

  },
  button2: {
    width: 300,
    backgroundColor: '#FF154E',
    borderRadius: 45,
    shadowColor: "purple",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textbutton: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  TextInputStyleClass: {
    fontSize: 20,
    width: 350,
    height: 60,
    borderWidth: 1,
    borderColor: '#2ECF96',
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 15,
    paddingHorizontal: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 35,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 15
  },
  image: {
    flex: 5,

  }

});
