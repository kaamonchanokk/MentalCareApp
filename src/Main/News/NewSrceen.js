import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import NewsList from "./NewsList";
import { categories } from "./catagory/Newscategories";
export default function NewSrceen(props) {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const Catagory = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10, justifyContent: 'center', left: 10, flexDirection: 'row', marginTop: 10 }}
        onPress={() => SelectCatNews(item.CatName)}
      >
         {item.CatName == 'ทั้งหมด' ? <View style={[styles.box3, { backgroundColor: '#FF6BBE' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'ทั่วไป' ? <View style={[styles.box3, { backgroundColor: '#00E27B' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'กิจกรรม' ? <View style={[styles.box3, { backgroundColor: '#00BDFF' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'ธรรมะ' ? <View style={[styles.box3, { backgroundColor: '#FFB600' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}

      </TouchableOpacity>
    );
  }
  const SelectCatNews = async (a) => {
    try {
      if (a === "ทั้งหมด") {
        const q = query(collection(db, "News"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          setdata(datas)
          setLoading(false);
        });
      } else {
        const q = query(collection(db, "News"), where("category", "==", a));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          setdata(datas)
          setLoading(false);
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  const newsList = async () => {
    try {
      const q = query(collection(db, "News"));
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
    newsList();
  }, []);

  const bg = require('../../../assets/main/Newsbg.png');
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <View style={{ flex:1}}>
          <FlatList
            data={categories}
            showsHorizontalScrollIndicator={false}
            renderItem={Catagory}
            keyExtractor={item => item.id}
            horizontal
          />
        </View >
        <View style={{ flex: 6, backgroundColor: '#EDF1FE' }}>
          {isLoading ? <ActivityIndicator /> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <View style={{ width: 400 }}>
                  <NewsList
                    navigation={props.navigation}
                    key={item.id}
                    news={item}
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
      justifyContent: 'center',
      alignItems: 'center',

  }
});
