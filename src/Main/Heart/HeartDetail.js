import React from "react";
import { ScrollView, View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
export default function HeartDetail(props) {
    //console.log(props.route.params.news)
    const bg = require('../../../assets/main/Heartbg2.png');
    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={{
                        width: 420,
                        height: 320,
                        top:30
                    }}
                    source={{ uri: props.route.params.heart.picture }}
                />
                <ImageBackground source={bg} resizeMode="cover" style={[styles.image]}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold',padding:30 }}>"{props.route.params.heart.title}"</Text>
                    <Text style={{ fontSize: 18, color: '#494949',paddingLeft:30,paddingRight:30 }}>{props.route.params.heart.detail}</Text>
                    <Text style={{ fontSize: 18, color: '#494949',paddingLeft:30,paddingRight:30,marginTop:10 }}>{props.route.params.heart.cradit}</Text>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor :'#FF666F'
    },
    box1: {
        flex: 1,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',

    },
    box2: {

        width: 390,

    },
    image: {
        height : 420,
        width : 420,

    }
});
