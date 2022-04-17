import React from "react";
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where } from "firebase/firestore";
import db from "../../database/firebaseDb";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
export default function MusicFlatList(props) {
    const [sound, setSound] = React.useState();
    const [urll, seturll] = React.useState("S");
    const [status, setstatus] = React.useState("S");
    async function playSound(url) {
        const { sound } = await Audio.Sound.createAsync({
            uri: url
        });
        setSound(sound);
        seturll(url)
        setstatus("P")
        console.log('Playing Sound');
        await sound.playAsync();
    }

    async function playAgain() {
        console.log('Playing Sound');
        await sound.playAsync();
        setstatus("P")
    }

    async function pauseSound() {
        console.log('Stop Sound');
        await sound.pauseAsync();
        setstatus("PS")
    }
    async function StopSound() {
        console.log('Stop Sound');
        await sound.unloadAsync();
        seturll("S")
    }

    React.useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                backgroundColor : 'white',
                borderEndWidth: 5,
                borderEndColor: '#2ECF96',
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
        >
            <Image
                source={{ uri: props.music.picture }}
                resizeMode="cover"
                style={{
                    width: 120,
                    height: 120,
                    margin: 10,
                    borderRadius: 10
                }}
            />
            <View style={{ flex: 2, marginLeft: 20, top: 20,paddingBottom:20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>{props.music.name}</Text>
                <Text style={{ fontSize: 17, color: '#0057A6', fontWeight: 'bold'}}>{props.music.cradit}</Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    {props.music.url != urll ? <TouchableOpacity onPress={() => playSound(props.music.url)} style={{ alignItems: 'flex-end', marginRight: 20 }}><Ionicons name="play-circle-outline" size={40} color="#07227B" /></TouchableOpacity> : null}
                    {props.music.url == urll && status == "PS" ? <TouchableOpacity onPress={playAgain} style={{ alignItems: 'flex-end', marginRight: 20 }}><Ionicons name="play-circle-outline" size={40} color="#07227B" /></TouchableOpacity> : null}
                    {props.music.url == urll && status == "P" ? <TouchableOpacity onPress={pauseSound} style={{ alignItems: 'flex-end', marginRight: 20 }}><Ionicons name="pause-circle-outline" size={40} color="#07227B" /></TouchableOpacity> : null}
                    <TouchableOpacity onPress={StopSound} style={{ alignItems: 'flex-end', marginRight: 20 }}><Ionicons name="stop-circle-outline" size={40} color="#07227B" /></TouchableOpacity>
                </View>
            </View>
        </View>
    )
}