import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../database/firebaseDb";
import MusicFlatList from "./MusicFlatList";
import { categories } from "./catagory/Musiccatagory";
export default function MusicSrceen(props) {
  const [data, setdata] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const Catagory = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10, justifyContent: 'center', left: 10, flexDirection: 'row', marginTop: 10 }}
        onPress={() => SelectCatMusic(item.CatName)}
      >
        {item.CatName == 'ทั้งหมด' ? <View style={[styles.box3, { backgroundColor: '#FF666F' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'ผ่อนคลาย' ? <View style={[styles.box3, { backgroundColor: '#00BDFF' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'ธรรมะ' ? <View style={[styles.box3, { backgroundColor: '#FFB600' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'พอดแคสต์' ? <View style={[styles.box3, { backgroundColor: '#FF00DC' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
        {item.CatName == 'J-POP' ? <View style={[styles.box3, { backgroundColor: '#8F00FF' }]}><Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{item.CatName}</Text></View> : null}
      </TouchableOpacity>
    );
  }
  const SelectCatMusic = async (a) => {
    try {
      if (a === "ทั้งหมด") {
        const q = query(collection(db, "Music"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push(doc.data());
          });
          setdata(datas)
          setLoading(false);
        });
      } else {
        const q = query(collection(db, "Music"), where("category", "==", a));
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
  const MusicList = async () => {
    try {
      const q = query(collection(db, "Music"));
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
    MusicList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ height: 60, backgroundColor: '#2ECF96' }}>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={Catagory}
          keyExtractor={item => item.id}
          horizontal
        />
      </View >
      <View style={{ flex: 5, backgroundColor: '#EDF1FE' }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ margin: 1 }}>
                <MusicFlatList
                  navigation={props.navigation}
                  key={item.id}
                  music={item}
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
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
    backgroundColor: '#FF62B0',
    marginRight: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
