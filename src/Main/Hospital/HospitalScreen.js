import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where,orderBy,limit } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import HospitalList from "./HospitalList";
export default function HospitalScreen(props) {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const hospitalList = async () => {
    try {
      const q = query(collection(db, "Hospital"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const datas = [];
        querySnapshot.forEach((doc) => {
          datas.push(doc.data());
        });
        setdata(datas)
        setLoading(false);
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  useEffect(() => {
    hospitalList();
  }, []);

  const bg = require('../../../assets/main/Hospitalbg.png');
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
      <View style={{ flex: 1 }}></View>
        <View style={{ flex: 8}}>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={{width: 400 }}>
                  <HospitalList
                    navigation={props.navigation}
                    key={item.id}
                    hospital={item}
                  />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box3: {
    height: 40,
    width: 90,
    backgroundColor: '#0688FF',
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
      flex: 5,
      marginTop:60,
      justifyContent: 'center',
      alignItems: 'center',

  }
});
