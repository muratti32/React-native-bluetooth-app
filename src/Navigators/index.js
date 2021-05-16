import React,{useEffect}  from 'react'
import { StyleSheet, Text, View } from 'react-native'

import HomeScreen from '../screens/homeScreen'
import SettingsScreen from '../screens/settings'
import {Provider,useDispatch} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper'
import {changeDeviceBluetoothEnabled} from '../store/actions'
import {bluetoothStatusText} from '../utils'

const Tab = createBottomTabNavigator();

const index = (props) => {



    const {colors} = useTheme()

    // Bluetooth status durum kontrolü
    const dispatch = useDispatch();

    useEffect(() => {
      
        return () => {
        };
        }, []
    )


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'home') {
                iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'settings') {
                iconName = focused ? 'settings' : 'settings-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            })}
            tabBarOptions={{
            activeTintColor: colors.primary,
            inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen options={{tabBarLabel:"Ana Kontrol"}} name="home" component={HomeScreen} />
            <Tab.Screen options={{tabBarLabel:"Ayarlar"}} name="settings" component={SettingsScreen} />
        </Tab.Navigator>
 
    )
}

export default index

const styles = StyleSheet.create({})