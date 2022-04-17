import React from "react";
import { ScrollView, View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../../database/firebaseDb";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
export default function HospitalDetail(props) {
    //console.log(props.route.params.hospital)
    const bg = require('../../../assets/main/Hospitalbg25.png');
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Image
                        style={{
                            width: 420,
                            height: 300
                        }}
                        source={{ uri: props.route.params.hospital.picture }}
                    />
                </View>
                <View style={{ backgroundColor: 'white' }}>
                    <View style={{ backgroundColor: '#8C52FF' }}>
                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'white', padding: 20 }}>{props.route.params.hospital.title}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white',height:200 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#6432C8', paddingLeft: 20, paddingRight: 20,marginTop:30 }}>รายละเอียด</Text>
                        <Text style={{ fontSize: 18, color: '#8E6CD1', marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>📍{props.route.params.hospital.address}</Text>
                        <Text style={{ fontSize: 15, color: '#8E6CD1', marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>✉️{props.route.params.hospital.email}</Text>
                        <Text style={{ fontSize: 15, color: '#8E6CD1', marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>📞{props.route.params.hospital.phone}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', height: 150 }}>
                    <TouchableOpacity
                        style={{

                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            margin: 10,
                            width: 150,
                            backgroundColor: '#FF84C9',
                            borderRadius: 45,
                            shadowColor: "#FF84C9",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                            marginRight: 40,
                            elevation: 10,
                        }}
                        onPress={() => props.navigation.navigate('HospitalWeb', {
                            hospital: props.route.params.hospital.link
                        })}
                    >
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>เว็ปไซต์หลัก</Text>

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            margin: 10,
                            width: 150,
                            backgroundColor: '#4BE360',
                            borderRadius: 45,
                            shadowColor: "#4BE360",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,
                        }}
                        onPress={() => props.navigation.navigate('HospitalMap', {
                            map: props.route.params.hospital.map
                        })}
                    >
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>แผนที่</Text>


                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8C52FF',
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 250,
        width: 420,
    }
});

