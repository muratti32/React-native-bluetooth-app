// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from '../screens/settings'
import ScheduleScreen from '../screens/schedule'

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const Stack = createStackNavigator();

function SettingsStack() {
    return (
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false }} name="settings" component={Settings} />
                <Stack.Screen options={{headerShown:true }} name="schedule" component={ScheduleScreen} />
            </Stack.Navigator>
    );
}

export default SettingsStack;