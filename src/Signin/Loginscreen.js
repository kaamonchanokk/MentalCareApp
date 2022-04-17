import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../database/firebaseDb";
import { LogBox } from 'react-native';

export default function Loginscreen(props) {
  const [name, setname] = useState("");
  const [username, setusername] = React.useState("");
  const [password, setpassword] = React.useState("");
  //const [iddd, setid] = useState("");
  const [data, setdata] = useState([]);
  const bg = require('../../assets/first/login1.png');

  const Clear = () => {
    setusername("")
    setpassword("")
  }

  async function UserLoginFunction() {
    try {
      LogBox.ignoreLogs(['Setting a timer'])
      const q = query(collection(db, "Users"), where("Username", "==", username), where("Password", "==", password));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
        const idd = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
          idd.push(doc.id);
        });
        if (username === "" || password === "") {
          Alert.alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน")
        }
        else if (users[0] === undefined) {
          Alert.alert("กรอกชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
        } else {
          Clear();
          props.navigation.navigate('Userscreen', { data: users, idu: idd })
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <View style={{ flex: 5.5 }}></View>
        <View style={{ flex: 9 }}>
          <Text style={{ fontSize: 25, color: '#1DA072', marginLeft: 33, fontWeight: 'bold' }}>เข้าสู่ระบบ</Text>
          <View style={{ justifyContent:'center',alignItems:'center'}}>
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
 

          <TouchableOpacity onPress={UserLoginFunction} >
            <View style={styles.button}>
              <Text style={styles.textbutton}>เข้าสู่ระบบ</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <Text style={{ color: 'black', fontSize: 22 }}>คุณยังไม่มีบัญชี ? </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Registerscreen')}>
                <View>
                  <Text style={{ color: '#24C48B', fontSize: 22, fontWeight: 'bold' }}>ลงทะเบียน</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 0.7,
    backgroundColor: '#ffb6c7',
  },
  container2: {
    flex: 5,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  }, box15: {
    height: 50,
    width: 50,
    backgroundColor: '#ffb6c7',
    borderRadius: 5,
    top: 20,
    left: 3,
    justifyContent: 'center',
    alignItems: 'center'

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
    width: 350,
    backgroundColor: '#A200FF',
    borderRadius: 25,
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
    textAlign: 'left',
    margin: 7,
    borderWidth: 1,
    borderColor: '#2ECF96',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  title: {

    fontSize: 35,
    color: "#fff",
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold'
  },
  font1: {
    top: 3,
    fontSize: 20,
    color: '#fff',
    //fontWeight: "bold",
    /*textShadowColor: '#000',
    textShadowOffset: {width: -1, height: 3},
    textShadowRadius: 10,*/

  },
  image: {
    flex: 5,
  }
});
