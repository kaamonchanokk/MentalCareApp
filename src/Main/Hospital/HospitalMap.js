import React from "react";
import { View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'
export default function HospitalMap(props) {
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
           <WebView
               originWhitelist={['*']}
               source={{uri: 'https://www.google.com/maps/search/?api=1&query='+props.route.params.map}}
           /> 
        </View>
     </SafeAreaView>
    )
}