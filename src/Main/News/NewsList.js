import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
export default function NewsList(props) {

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor : 'white',
                shadowColor: "#00063C",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,

                elevation: 2,
                margin: 5,
            }}

            onPress={() => props.navigation.navigate('NewsDetail', {
                news : props.news
              })}
        >
            <Image
                source={{ uri: props.news.picture1 }}
                resizeMode="cover"
                style={{
                    width: 120,
                    height: 120,
                    margin: 10,
                    borderRadius: 10
                }}
            />
            <View style={{ flex: 2, marginLeft: 5, top: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black',width:220 }}>{props.news.title}</Text>
                <Text style={{ fontSize: 15, color: '#0057A6', fontWeight: 'bold'}}>{props.news.cradit}</Text>
                <Text style={{ fontSize: 15, color: 'black', }}>{props.news.date}</Text>
                <View style={{ flexDirection: 'row', marginTop: 35 }}>
                </View>
            </View>
        </TouchableOpacity>
    )
}