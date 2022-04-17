import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { addDoc, collection, getDocs, onSnapshot, doc, query, where, updateDoc, update } from "firebase/firestore";
import { useEffect, useState } from 'react';
import db from "../../database/firebaseDb";
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
    TextInput,
} from 'react-native-paper';

export default function InfoScreen(props) {
    const bg = require('../../assets/info/INFO2.png');
    const [datar, setdatar] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [inputVal, setInputVal] = useState('test');

    const [editname, seteditname] = useState(props.route.params.data[0].Name);
    const [editphone, seteditphone] = useState(props.route.params.data[0].Phone);
    const [editaboutme, seteditaboutme] = useState(props.route.params.data[0].aboutme);

    const [iddd, setid] = useState("");
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [isDialogVisible2, setIsDialogVisible2] = useState(false);
    const [status, setstatus] = useState(0);
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
                setdatar(datas)
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

    async function updateDocument() {
        try {
            const Ref = doc(db, "Users", iddd);
            await updateDoc(Ref, {
                Name: editname,
                Phone: editphone
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    async function updateAboutme() {
        try {
            const Ref = doc(db, "Users", iddd);
            await updateDoc(Ref, {
                aboutme: editaboutme
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    return (

        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                <ImageBackground source={bg} resizeMode="cover" style={styles.image}>

                    <View style={{ flex: 3, flexDirection: 'column',justifyContent:'center' }}>
                        <View style={styles.box1}>
                            <Image
                                source={{ uri: props.route.params.data[0].picture }}
                                resizeMode="cover"
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 180,
                                    borderWidth: 3,
                                    borderColor: 'white',
                                    marginRight: 30,

                                }}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                                    {datar[0].Name}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'white' }}>
                                    👤{datar[0].Username}
                                </Text>
                                <Text style={{ fontSize: 20, color: 'white' }}>
                                    ☎️{datar[0].Phone}
                                </Text>
                            </View>
                        </View>
                        <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 40,
                                    width: 350,
                                    backgroundColor: '#FFCF5A',
                                    borderColor: '#FFCF5A',
                                    borderWidth: 1,
                                    borderRadius: 10
                                    ,marginTop :20
                                }}
                                onPress={() => setIsDialogVisible(true)}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                    แก้ไขข้อมูล
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>





                    <View style={styles.box15}></View>

                    <View style={styles.box2}>
                        <TouchableOpacity
                            onPress={() => setIsDialogVisible2(true)}
                            style={{
                                height: 200,
                                width: 360,
                                backgroundColor: 'white',
                                borderRadius: 25,
                                borderColor: '#98F8D3',
                                borderWidth: 2.5,

                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ImageBackground style={{
                                height: 185,
                                width: 345,
                            }}
                                source={require('../../assets/info/aboutme.png')}
                            >
                                <Text style={{ color: '#1DA072', fontSize: 18, marginTop: 45, marginLeft: 23 }}>
                                    {datar[0].aboutme}
                                </Text>

                            </ImageBackground>

                        </TouchableOpacity>

                        {datar[0].total == -1 ?
                            <View
                                style={{
                                    height: 100,
                                    width: 360,
                                    marginTop: 30,
                                    backgroundColor: '#999999',
                                    borderRadius: 25,
                                    shadowColor: "#999999",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.34,
                                    shadowRadius: 6.27,
                                    flexDirection: 'row'
                                    , direction: 'rtl'
                                    , alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../../assets/info/face/level0.png')}
                                    resizeMode="cover"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 45,
                                        borderColor: 'white',
                                        marginRight: 30,
                                        marginLeft: 20,

                                    }}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                                        ระดับอารมณ์
                                    </Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        ยังไม่ประเมิน
                                    </Text>
                                </View>

                            </View>
                            : null}

                        { datar[0].total >= 0 && datar[0].total < 7 ?
                            <View
                                style={{
                                    height: 100,
                                    width: 360,
                                    marginTop: 30,
                                    backgroundColor: '#00BFF3',
                                    borderRadius: 25,
                                    shadowColor: "#00BFF3",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.34,
                                    shadowRadius: 6.27,
                                    flexDirection: 'row'
                                    , direction: 'rtl'
                                    , alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../../assets/info/face/level1.png')}
                                    resizeMode="cover"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 45,
                                        borderColor: 'white',
                                        marginRight: 30,
                                        marginLeft: 20,

                                    }}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                                        ระดับอารมณ์
                                    </Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        มีความสุข
                                    </Text>
                                </View>

                            </View>
                            : null}

                        {datar[0].total >= 7 && datar[0].total <= 12 ?
                            <View
                                style={{
                                    height: 100,
                                    width: 360,
                                    marginTop: 30,
                                    backgroundColor: '#07D58A',
                                    borderRadius: 25,
                                    shadowColor: "#05B877",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.34,
                                    shadowRadius: 6.27,
                                    flexDirection: 'row'
                                    , direction: 'rtl'
                                    , alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../../assets/info/face/level2.png')}
                                    resizeMode="cover"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 45,
                                        borderColor: 'white',
                                        marginRight: 30,
                                        marginLeft: 20,

                                    }}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                                        ระดับอารมณ์
                                    </Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        ปกติ
                                    </Text>
                                </View>

                            </View>
                            : null}


                        {datar[0].total >= 13 && datar[0].total <= 18 ?
                            <View
                                style={{
                                    height: 100,
                                    width: 360,
                                    marginTop: 30,
                                    backgroundColor: '#F26C4F',
                                    borderRadius: 25,
                                    shadowColor: "#F26C4F",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.34,
                                    shadowRadius: 6.27,
                                    flexDirection: 'row'
                                    , direction: 'rtl'
                                    , alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../../assets/info/face/level3.png')}
                                    resizeMode="cover"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 45,
                                        borderColor: 'white',
                                        marginRight: 30,
                                        marginLeft: 20,

                                    }}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                                        ระดับอารมณ์
                                    </Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        ซึมเศร้าปานกลาง
                                    </Text>
                                </View>

                            </View>
                            : null}

                        {datar[0].total > 18 ?
                            <View
                                style={{
                                    height: 100,
                                    width: 360,
                                    marginTop: 30,
                                    backgroundColor: '#9E0B0F',
                                    borderRadius: 25,
                                    shadowColor: "#9E0B0F",
                                    shadowOffset: {
                                        width: 0,
                                        height: 5,
                                    },
                                    shadowOpacity: 0.34,
                                    shadowRadius: 6.27,
                                    flexDirection: 'row'
                                    , direction: 'rtl'
                                    , alignItems: 'center'
                                }}
                            >
                                <Image
                                    source={require('../../assets/info/face/level4.png')}
                                    resizeMode="cover"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 45,
                                        borderColor: 'white',
                                        marginRight: 30,
                                        marginLeft: 20,

                                    }}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginBottom: 5 }}>
                                        ระดับอารมณ์
                                    </Text>
                                    <Text style={{ fontSize: 20, color: 'white' }}>
                                        ซึมเศร้ารุนแรง
                                    </Text>
                                </View>

                            </View>
                            : null}


                    </View>










                    <Provider>
                        <View>
                            <Portal>
                                <Dialog
                                    visible={isDialogVisible}
                                    onDismiss={() => setIsDialogVisible(false)}>
                                    <Dialog.Title>แก้ไขข้อมูลส่วนตัว</Dialog.Title>
                                    <Dialog.Content>
                                        <Text>ชื่อผู้ใช้</Text>
                                        <TextInput
                                            value={editname}
                                            onChangeText={seteditname}
                                            theme={{ colors: { primary: '#2ECF96', underlineColor: '#2ECF96' } }}
                                        />
                                        <Text>เบอร์โทร</Text>
                                        <TextInput
                                            value={editphone}
                                            onChangeText={seteditphone}
                                            theme={{ colors: { primary: '#2ECF96', underlineColor: '#2ECF96' } }}
                                        />
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={() => { setIsDialogVisible(false), updateDocument() }}><Text style={{ color: "#2ECF96" }}>ตกลง</Text></Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                    </Provider>

                    <Provider>
                        <View>
                            <Portal>
                                <Dialog
                                    visible={isDialogVisible2}
                                    onDismiss={() => setIsDialogVisible2(false)}>
                                    <Dialog.Title>แก้ไขเกี่ยวกับตัวฉัน</Dialog.Title>
                                    <Dialog.Content>
                                        <TextInput
                                            value={editaboutme}
                                            onChangeText={seteditaboutme}
                                            theme={{ colors: { primary: '#2ECF96', underlineColor: '#2ECF96' } }}
                                            style={{ textAlignVertical: 'top', fontSize: 18 }}
                                            multiline
                                            numberOfLines={5}
                                        />
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={() => { setIsDialogVisible2(false), updateAboutme() }}><Text style={{ color: "#2ECF96" }}>ตกลง</Text></Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                    </Provider>
                </ImageBackground>
            )}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flexx1: {
        flex: 3,
    },
    box1: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'pink',
    },
    box15: {
        flex: 1
        //backgroundColor: 'pink',
    },
    box2: {
        flex: 6,
        //backgroundColor: 'blue'
    },
    box3: {
        flex: 2,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center'
        //backgroundColor: 'blue',
    },
    image: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    box4: {
        height: 208,
        width: 350,
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
