import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, onSnapshot, doc, query, where, updateDoc, update } from "firebase/firestore";
import { LogBox } from 'react-native';
import { Audio } from 'expo-av';
import * as React from 'react';
import db from "../../database/firebaseDb";
import { CheckBox } from 'react-native-elements';
export default function QuestionSrceen(props) {
    const [i, seti] = React.useState(0)
    const [data, setdata] = useState([]);

    const [isLoading, setLoading] = useState(true);

    //console.log(props)

    const AssessmentList = async () => {
        try {
            const q = query(collection(db, "Assessment"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const cities = [];
                querySnapshot.forEach((doc) => {
                    cities.push(doc.data());
                });
                setdata(cities)
                setLoading(false);
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    useEffect(() => {
        AssessmentList();
    }, []);

    const [answer1, setanswer1] = useState(false)
    const [answer2, setanswer2] = useState(false)
    const [answer3, setanswer3] = useState(false)
    const [answer4, setanswer4] = useState(false)
    const [nowscore, setnowscore] = useState(0)
    const [score, setscore] = useState(-1)
    const setscorea1 = () => {
        setanswer1(true)
        setanswer2(false)
        setanswer3(false)
        setanswer4(false)
        setscore(0)
    }
    const setscorea2 = () => {
        setanswer1(false)
        setanswer2(true)
        setanswer3(false)
        setanswer4(false)
        setscore(1)
    }
    const setscorea3 = () => {
        setanswer1(false)
        setanswer2(false)
        setanswer3(true)
        setanswer4(false)
        setscore(2)
    }
    const setscorea4 = () => {
        setanswer1(false)
        setanswer2(false)
        setanswer3(false)
        setanswer4(true)
        setscore(3)
    }
    const Submit = () => {
        if (score === -1) {
            Alert.alert("กรุณาเลือกคำตอบ")
        }
        else {
            seti(i + 1)
            setnowscore(nowscore + score)
            setscore(-1)
            setanswer1(false)
            setanswer2(false)
            setanswer3(false)
            setanswer4(false)
        }
    }
    async function updatetotal() {
        try {
            const Ref = doc(db, "Users", props.route.params.idu[0]);
            await updateDoc(Ref, {
                total: nowscore
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const AnswerCompanent = () => {
        //console.log(props.route.params.idu);
        updatetotal();
        return (
            <View style={{ flex: 5, backgroundColor: '#CCEFE2' }}>
                <View style={{ flex: 1, justifyContent: 'center', marginLeft: 250, marginTop: 20 }}>
                    <View
                        onPress={Submit}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            width: 150,
                            backgroundColor: '#2ECF96',
                            borderRadius: 18,
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
                        <Text style={{ fontSize: 20, color: 'white' }}>คะแนนที่ได้ : {nowscore}</Text>
                    </View>

                </View>
                {nowscore < 7 ?

                    <View style={{ flex: 6, backgroundColor: '#CCEFE2', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: '#F1FAF7', borderRadius: 45, height: 500, width: 380,

                            shadowColor: "#23795B",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,
                        }}>
                            <View style={{ flex: 2, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 155,
                                        height: 155,
                                        borderWidth: 5,
                                        borderColor: 'white',
                                        borderRadius: 75,

                                    }}
                                    source={require('../../assets/assessment/level1.png')}
                                />
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>สถานะของคุณ</Text>
                                <Text style={{ fontSize: 28, color: 'black', marginTop: 10, fontWeight: 'bold' }}>มีความสุข</Text>
                            </View>
                            <View style={{ flex: 1.5, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>คำแนะนำ</Text>
                                <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}>ทำตัวเองให้สดใสทุกวันนะ</Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', padding: 10 }}>
                                <Text style={{ fontSize: 17, color: 'red' }}>ผลคะแนนนี้ เป็นเพียงการประเมินเบื้องต้นเท่านั้น การป่วยเป็นโรคซึมเศร้าหรือไม่ ต้องมาจากการวินิจฉัยแพทย์เท่านั้น</Text>
                            </View>
                        </View>
                    </View>


                    : null}
                {nowscore >= 7 && nowscore <= 12 ?

                    <View style={{ flex: 6, backgroundColor: '#CCEFE2', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: '#F1FAF7', borderRadius: 45, height: 500, width: 380,

                            shadowColor: "#23795B",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,
                        }}>
                            <View style={{ flex: 2, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 155,
                                        height: 155,
                                        borderWidth: 5,
                                        borderColor: 'white',
                                        borderRadius: 75,

                                    }}
                                    source={require('../../assets/assessment/level2.png')}
                                />
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>สถานะของคุณ</Text>
                                <Text style={{ fontSize: 28, color: 'black', marginTop: 10, fontWeight: 'bold' }}>ปกติ</Text>
                            </View>
                            <View style={{ flex: 1.5, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>คำแนะนำ</Text>
                                <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}>อย่าลืมกอดตัวเองทุกวันนะ</Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', padding: 10 }}>
                                <Text style={{ fontSize: 17, color: 'red' }}>ผลคะแนนนี้ เป็นเพียงการประเมินเบื้องต้นเท่านั้น การป่วยเป็นโรคซึมเศร้าหรือไม่ ต้องมาจากการวินิจฉัยแพทย์เท่านั้น</Text>
                            </View>
                        </View>
                    </View>

                    : null}
                {nowscore >= 13 && nowscore <= 18 ?

                    <View style={{ flex: 6, backgroundColor: '#CCEFE2', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: '#F1FAF7', borderRadius: 45, height: 500, width: 380,

                            shadowColor: "#23795B",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,
                        }}>
                            <View style={{ flex: 2, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 155,
                                        height: 155,
                                        borderWidth: 5,
                                        borderColor: 'white',
                                        borderRadius: 75,

                                    }}
                                    source={require('../../assets/assessment/level3.png')}
                                />
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>สถานะของคุณ</Text>
                                <Text style={{ fontSize: 28, color: 'black', marginTop: 10, fontWeight: 'bold' }}>ซึมเศร้าปานกลาง</Text>
                            </View>
                            <View style={{ flex: 1.5, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>คำแนะนำ</Text>
                                <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}>ควรเริ่มดูแลตัวเองแล้วนะ</Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', padding: 10 }}>
                                <Text style={{ fontSize: 17, color: 'red' }}>ผลคะแนนนี้ เป็นเพียงการประเมินเบื้องต้นเท่านั้น การป่วยเป็นโรคซึมเศร้าหรือไม่ ต้องมาจากการวินิจฉัยแพทย์เท่านั้น</Text>
                            </View>
                        </View>
                    </View>

                    : null}


                {nowscore > 18 ?

                    <View style={{ flex: 6, backgroundColor: '#CCEFE2', alignItems: 'center' }}>
                        <View style={{
                            backgroundColor: '#F1FAF7', borderRadius: 45, height: 500, width: 380,

                            shadowColor: "#23795B",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.34,
                            shadowRadius: 6.27,

                            elevation: 10,
                        }}>
                            <View style={{ flex: 2, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 155,
                                        height: 155,
                                        borderWidth: 5,
                                        borderColor: 'white',
                                        borderRadius: 75,

                                    }}
                                    source={require('../../assets/assessment/level4.png')}
                                />
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black' }}>สถานะของคุณ</Text>
                                <Text style={{ fontSize: 28, color: 'black', marginTop: 10, fontWeight: 'bold' }}>ซึมเศร้ารุนแรง</Text>
                            </View>
                            <View style={{ flex: 1.5, backgroundColor: 'transparent', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'black', marginBottom: 10 }}>คำแนะนำ</Text>
                                <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}>ควรปรึกษาจิตแพทย์</Text>
                                <Text style={{ fontSize: 28, color: 'black', fontWeight: 'bold' }}>หรือผู้เชี่ยวชาญ</Text>
                            </View>
                            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'center', padding: 10 }}>
                                <Text style={{ fontSize: 17, color: 'red' }}>ผลคะแนนนี้ เป็นเพียงการประเมินเบื้องต้นเท่านั้น การป่วยเป็นโรคซึมเศร้าหรือไม่ ต้องมาจากการวินิจฉัยแพทย์เท่านั้น</Text>
                            </View>
                        </View>
                    </View>

                    : null}
            </View>
        );
    }

    const Companent = () => {
        return (
            <View style={{ flex: 5, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 2, backgroundColor: 'white', justifyContent: 'center', marginLeft: 12 }}>
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#2ECF96' }}>{i + 1}/9</Text>
                        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#2ECF96' }}>{data[i].question}</Text>
                    </View>
                </View>
                <View style={{ flex: 5, backgroundColor: '#C9FAE9' }}>
                    <View style={{ flex: 5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                        <CheckBox
                            title={<Text style={{ fontWeight: "bold", fontSize: 20, color: '#26C48C' }}>  {data[i].answer1}</Text>}
                            checked={answer1}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            onPress={setscorea1}
                            uncheckedColor='#2ECF96'
                            checkedColor='#2ECF96'
                            containerStyle={{ backgroundColor: '#E7FFF5', borderColor: '#2ECF96', borderRadius: 20, borderWidth: 1, width: 350, height: 50, justifyContent: 'center' }}
                        />

                        <CheckBox
                            title={<Text style={{ fontWeight: "bold", fontSize: 20, color: '#26C48C' }}>  {data[i].answer2}</Text>}
                            checked={answer2}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            onPress={setscorea2}
                            uncheckedColor='#2ECF96'
                            checkedColor='#2ECF96'
                            containerStyle={{ backgroundColor: '#E7FFF5', borderColor: '#2ECF96', borderRadius: 20, borderWidth: 1, width: 350, height: 50, justifyContent: 'center' }}
                        />
                        <CheckBox
                            title={<Text style={{ fontWeight: "bold", fontSize: 20, color: '#26C48C' }}>  {data[i].answer3}</Text>}
                            checked={answer3}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            onPress={setscorea3}
                            uncheckedColor='#2ECF96'
                            checkedColor='#2ECF96'
                            containerStyle={{ backgroundColor: '#E7FFF5', borderColor: '#2ECF96', borderRadius: 20, borderWidth: 1, width: 350, height: 50, justifyContent: 'center' }}
                        />
                        <CheckBox
                            title={<Text style={{ fontWeight: "bold", fontSize: 20, color: '#26C48C' }}>  {data[i].answer4}</Text>}
                            checked={answer4}
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            onPress={setscorea4}
                            uncheckedColor='#2ECF96'
                            checkedColor='#2ECF96'
                            containerStyle={{ backgroundColor: '#E7FFF5', borderColor: '#2ECF96', borderRadius: 20, borderWidth: 1, width: 350, height: 50, justifyContent: 'center' }}
                        />
                    </View>
                    <View style={{ flex: 2, backgroundColor: 'white', alignItems: 'center' }}>

                        <TouchableOpacity
                            onPress={() => { Submit() }}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 60,
                                width: 350,
                                backgroundColor: '#2ECF96',
                                borderRadius: 18,
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
                            <Text style={{ fontSize: 25, color: 'white' }}>ยืนยัน</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            {i < 9 ?
                isLoading ? <ActivityIndicator /> :
                    (
                        <Companent />
                    )
                : null}
            {i === 9 ?
                isLoading ? <ActivityIndicator /> :
                    (
                        <AnswerCompanent />
                    )
                : null}
        </View>
    );
}