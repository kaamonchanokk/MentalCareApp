import React from "react";
import { ScrollView, View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
export default function NewsDetail(props) {
    //console.log(props.route.params.news)
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.box1}>
                    <View style={[styles.box2, { padding: 20 }]}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{props.route.params.news.title}</Text>
                        <Text style={{ fontSize: 15  ,marginTop:5}}>เขียนโดย : {props.route.params.news.cradit}</Text>
                        <Image
                            style={{
                                width: 350,
                                height: 200,
                                marginTop:20
                            }}
                            source={{ uri: props.route.params.news.picture1 }}
                        />
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18, color: '#494949' }}>{props.route.params.news.detail1}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 50,
                                margin: 10,
                                width: 150,
                                backgroundColor: '#FF84C9',
                                borderRadius: 45,
                                shadowColor: "#FF008F",
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.34,
                                shadowRadius: 6.27,

                                elevation: 10,
                                marginLeft :200
                            }}
                            onPress={() => props.navigation.navigate('NewsWeb', {
                                news : props.route.params.news.link
                              })}
                        >
                            <View style={{direction : 'rtl'}}>
                                <Text style={{ fontSize: 18, color: 'white' }}>อ่านเพิ่มเติม</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E9E9E9'
    },
    box2: {

        width: 390,
        backgroundColor: '#F4FAFF'
    }
});
