import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../database/firebaseDb";
import { LogBox } from 'react-native';

export default function Welcomescreen(props) {
    const bg = require('../../assets/first/wel1.png');

    return (
        <View style={styles.container}>
            <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 10 }}></View>
                <View style={{ flex: 3,justifyContent:'center',alignItems:'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Loginscreen')}>
                        <View style={styles.button2}>
                            <Text style={styles.textbutton}>เริ่มต้น</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 5,
    },
    button2: {
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
      margin:5
 
    },
    textbutton: {
      textAlign: 'center',
      padding: 20,
      color: 'white',
      fontSize: 20,
      fontWeight:'bold'
    }
});
