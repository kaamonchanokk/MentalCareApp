import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import * as React from 'react';
import db from "../../database/firebaseDb";
import QuestionSrceen from './QuestionSrceen';

export default function AssessmentSrceen(props) {
    const bg = require('../../assets/assessment/asbg222.png');
    return (
        <View style={styles.container}>
            <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 8 }}>
                </View>
                <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('QuestionSrceen')}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 60,
                            width: 250,
                            backgroundColor: '#2ECF96',
                            borderRadius: 45,
                            shadowColor: "#2ECF96",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,
                        }}
                    >
                        <Text style={{fontSize : 23, color : 'white'}}>เริ่มต้นทำแบบทดสอบ</Text>
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
    }
});