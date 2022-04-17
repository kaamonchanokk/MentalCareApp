import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList } from 'react-native';
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
import AssessmentSrceen from './AssessmentSrceen';
import QuestionSrceen from './QuestionSrceen';

const homeStact = createNativeStackNavigator()
export default function AssessmentMenu(props) {
    return (
        <homeStact.Navigator>
            <homeStact.Screen name="AssessmentSrceen" component={AssessmentSrceen}
                initialParams={{ data: props.route.params.data,idu: props.route.params.idu}}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: '#5A7FFF',
                        shadowColor: "#5A7FFF"
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    title: 'เริ่มต้น'
                }} />
            <homeStact.Screen name="QuestionSrceen" component={QuestionSrceen}
                initialParams={{ data: props.route.params.data,idu: props.route.params.idu }}
                options={{
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTintColor: '#2ECF96',
                    title: ' '
                }} />
        </homeStact.Navigator>
    );
}