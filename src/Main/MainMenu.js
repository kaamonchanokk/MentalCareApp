import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import MainScreen from './MainScreen';
import NewSrceen from './News/NewSrceen';
import NewsDetail from './News/NewsDetail';
import NewsWeb from './News/NewsWeb';
import HeartScreen from './Heart/HeartScreen';
import HeartDetail from './Heart/HeartDetail';
import PhoneSrceen from './Phone/PhoneScreen';
import HospitalScreen from './Hospital/HospitalScreen';
import HospitalDetail from './Hospital/HospitalDetail';
import HospitalMap from './Hospital/HospitalMap';
import HospitalWeb from './Hospital/HospitalWeb';
const homeStack = createNativeStackNavigator()
export default function MainMenu(props) {
  return (
    <homeStack.Navigator>
      <homeStack.Screen name="MainScreen" component={MainScreen}
        initialParams={{ data: props.route.params.data }}
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
          title: 'หน้าหลัก'
        }} />

      <homeStack.Screen name="NewsSrceen" component={NewSrceen}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#0688FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'ข่าวสาร'
        }} />
      <homeStack.Screen name="NewsDetail" component={NewsDetail}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#0688FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'รายละเอียดข่าวสาร'
        }} />
      <homeStack.Screen name="NewsWeb" component={NewsWeb}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#0688FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: ' '
        }} />

      <homeStack.Screen name="HeartScreen" component={HeartScreen}
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#FF666F',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'กำลังใจ'
        }} />

      <homeStack.Screen name="HeartDetail" component={HeartDetail}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
            shadowColor: "#FF666F"
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: ' '
        }} />

      <homeStack.Screen name="PhoneScreen" component={PhoneSrceen}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#FFBD59',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'ติดต่อสายด่วน'
        }} />

      <homeStack.Screen name="HospitalScreen" component={HospitalScreen}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#8C52FF'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: 'โรงพยาบาล'
        }} />
      <homeStack.Screen name="HospitalDetail" component={HospitalDetail}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: ' '
        }} />
      <homeStack.Screen name="HospitalMap" component={HospitalMap}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#8C52FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: ' '
        }} />
      <homeStack.Screen name="HospitalWeb" component={HospitalWeb}
        options={{
          headerTransparent: true,
          headerStyle: {
            backgroundColor: '#8C52FF',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          title: ' '
        }} />
    </homeStack.Navigator>
  );
}
