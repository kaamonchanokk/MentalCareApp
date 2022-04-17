import React from "react";
import { View, ImageBackground, Image, Text } from 'react-native';

export default function Splash(props) {
    const bg = require('../assets/first/sp2.png');
    setTimeout(() => {
        props.navigation.navigate("Welcomescreen")
    }, 5000);
    return (
        <ImageBackground
            source={bg}
            style={{ height: '100%', width: '100%' }}>
        </ImageBackground>
    );
}