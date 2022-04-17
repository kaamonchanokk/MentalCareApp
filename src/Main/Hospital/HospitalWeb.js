import React from "react";
import { View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'
export default function HospitalWeb(props) {
    //console.log(props.route.params.hospital)
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
           <WebView
               originWhitelist={['*']}
               source={{uri: props.route.params.hospital}}
           /> 
        </View>
     </SafeAreaView>
    )
}