import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList, ImageBackground,ActivityIndicator } from 'react-native';
import * as React from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where, updateDoc, update } from "firebase/firestore";
import { useEffect, useState } from 'react';
import db from "../../database/firebaseDb";

export default function MainScreen(props) {
    const bg = require('../../assets/main/mainbg.png');

    const [data, setdata] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [id, setid] = useState("");
    //console.log(props.route.params.data[0].Name)
    const userList = async () => {
        try {

            const q = query(collection(db, "Users"), where("Username", "==", props.route.params.data[0].Username), where("Password", "==", props.route.params.data[0].Password));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const datas = [];
                const idd = [];
                querySnapshot.forEach((doc) => {
                    datas.push(doc.data());
                    idd.push(doc.id);
                });
                setdata(datas)
                setid(idd[0])
                setLoading(false);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    useEffect(() => {
        userList();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
                    <View style={styles.box1}>
                        <Image
                            source={{ uri: props.route.params.data[0].picture }}
                            resizeMode="cover"
                            style={{
                                width: 80,
                                height: 80,
                                borderRadius: 180,
                                borderWidth: 3,
                                marginRight: 30,
                                borderColor: 'white'
                            }}
                        />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                                ยินดีต้อนรับ
                            </Text>
                            <Text style={{ fontSize: 20, color: 'white' }}>
                                คุณ{data[0].Name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.box2}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('AssessmentMenu')}>
                            <Image style={styles.box4}
                                source={require('../../assets/main/as1.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box3}>
                        <View style={{ flexDirection: 'row', marginLeft: 10, justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('NewsSrceen')}
                                style={{ alignItems: 'center' }}>
                                <View style={[styles.boxicon, { backgroundColor: '#DDFFFE' }]}>
                                    <Image style={{ height: 40, width: 40 }}
                                        source={require('../../assets/main/iconformain/icon1.png')}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, color: '#043423', marginTop: 10 }}>
                                    ข่าวสาร
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('HeartScreen')}
                                style={{ alignItems: 'center' }}>
                                <View style={[styles.boxicon, { backgroundColor: '#FEEDF5' }]}>
                                    <Image style={{ height: 40, width: 40 }}
                                        source={require('../../assets/main/iconformain/icon2.png')}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, color: '#043423', marginTop: 10 }}>
                                    กำลังใจ
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('PhoneScreen')}
                                style={{ alignItems: 'center' }}>
                                <View style={[styles.boxicon, { backgroundColor: '#FFF4EE' }]}>
                                    <Image style={{ height: 40, width: 40 }}
                                        source={require('../../assets/main/iconformain/icon3.png')}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, color: '#043423', marginTop: 10 }}>
                                    สายด่วน
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('HospitalScreen')}
                                style={{ alignItems: 'center' }}>
                                <View style={[styles.boxicon, { backgroundColor: '#F1F1F1' }]}>
                                    <Image style={{ height: 50, width: 50 }}
                                        source={require('../../assets/main/iconformain/icon4.png')}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, color: '#043423', marginTop: 10 }}>
                                    โรงพยาบาล
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box1: {
        flex: 1.5,
        width: 410,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 20
        //backgroundColor: 'green'
    },
    box2: {
        flex: 2.5,
        //backgroundColor: 'pink'
    },
    box3: {
        flex: 2,
        width: 350,
        justifyContent: 'center',
        //backgroundColor: 'blue',
    },
    image: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    box4: {
        height: 250,
        width: 350,

        borderRadius: 15,
    },
    boxicon: {
        //backgroundColor: '#FFF5FA',
        borderRadius: 45,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
