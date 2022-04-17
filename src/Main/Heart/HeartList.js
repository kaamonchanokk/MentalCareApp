import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
export default function HeartList(props) {

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                flexDirection: 'column',
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
                borderRadius :15
            }}

            onPress={() => props.navigation.navigate('HeartDetail', {
                heart : props.heart
              })}
        >
            <Image
                source={{ uri: props.heart.picture }}
                resizeMode="cover"
                style={{
                    width: 370,
                    height: 150,
                    margin: 10,
                    borderRadius: 10
                }}
            />
            <View style={{ flex: 2, marginLeft: 5,padding:10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{props.heart.title}</Text>
                <View style={{ flexDirection: 'row', marginTop: 25 }}>
                </View>
            </View>
        </TouchableOpacity>
    )
}