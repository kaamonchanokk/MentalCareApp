import React from "react";
import { View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview'
export default function NewsWeb(props) {

    return (
           <SafeAreaView style={{flex: 1}}>
           <View style={{flex: 1}}>
              <WebView
                  originWhitelist={['*']}
                  source={{uri: props.route.params.news}}
              /> 
           </View>
        </SafeAreaView>
    )
}