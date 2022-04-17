import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome5, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import * as React from 'react';


import Splash from './src/Splash';
import Loginscreen from './src/Signin/Loginscreen';
import Registerscreen from './src/Signin/Registerscreen';
import MusicSrceen from './src/Music/MusicSrceen';
import AssessmentMenu from './src/Assessment/AssessmentMenu';
import MainMenu from './src/Main/MainMenu';
import InfoScreen from './src/Info/InfoScreen';
import Welcomescreen from './src/Signin/Welcomescreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
}

const StackNavigation = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Welcomescreen" component={Welcomescreen} options={{ headerShown: false }} />
      <Stack.Screen name="Loginscreen" component={Loginscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Registerscreen" component={Registerscreen} options={{ headerShown: false }} />
      <Stack.Screen name="Userscreen" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#2ECF96',
          shadowColor: '#2ECF96',
          shadowRadius: 1
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#2ECF96',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') {
            return <Ionicons name="md-home" color={color} size={25} />
          }
          else if (route.name === 'AssessmentMenu') {
            return <Ionicons name="md-newspaper" size={25} color={color} />
          }
          else if (route.name === 'MusicSrceen') {
            return <AntDesign name="sound" size={25} color={color} />
          }
          else if (route.name === 'InfoUser') {
            return <FontAwesome name="user-circle" size={24} color={color} />
          }
          else if (route.name === 'Logout')
          {
            return <AntDesign name="logout" size={24} color={color} />
          }
        }
      })}
    >
      <Tab.Screen
        name="Home"
        initialParams={{ data: props.route.params.data }}
        component={MainMenu}
        options={{
          headerShown: false,
          title: 'หน้าหลัก',
        }} />
      <Tab.Screen
        name="AssessmentMenu"
        initialParams={{ data: props.route.params.data,idu : props.route.params.idu }}
        component={AssessmentMenu}
        options={{
          headerShown: false,
          title: 'แบบประเมิน',
        }}
      />
      <Tab.Screen
        name="MusicSrceen"
        //initialParams={{Email : props.route.params.Email, u_id : props.route.params.u_id}}
        component={MusicSrceen}
        options={{
          title: 'สื่อเพลง',
        }}
      />
      <Tab.Screen
        name="InfoUser"
        //initialParams={{Email : props.route.params.Email, u_id : props.route.params.u_id}}
        component={InfoScreen}
        initialParams={{ data: props.route.params.data }}
        options={{
          title: 'โปรไฟล์',
          headerTitleAlign: 'center'
        }}
      />
      <Tab.Screen
        name="Logout"
        //initialParams={{Email : props.route.params.Email, u_id : props.route.params.u_id}}
        component={Logout}
        initialParams={{ data: props.route.params.data }}
        options={{
          title: 'ออกจากระบบ',
          headerTitleAlign: 'center'
        }}
      />
    </Tab.Navigator>
  );
}
const Logout = (props) => {
  setTimeout(()=>
  {
      props.navigation.navigate("Loginscreen")
  },1);
  return null;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
