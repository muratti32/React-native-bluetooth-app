import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Linking,Button,Alert } from 'react-native'
import { BleManager } from 'react-native-ble-plx';
import {useDispatch} from 'react-redux';
import {bluetoothStatusText} from '../../../utils'

export default () => {
    const manager = new BleManager()
    const [bluetoothStatus, setBluetoothStatus] = useState("")

 

    useEffect(() => {
        const subscription = manager.onStateChange(state => {
            setBluetoothStatus(state)
        })
        checkBluetoothStatus()
        return () => {
            subscription.remove()
        };
        }, []
    )

    const checkBluetoothStatus = () => {
        manager.state()
        .then(state => {
            setBluetoothStatus(state)
        })
        .catch(err => console.error(err))
    }
    
    const openSetting = () => {
        Linking.openSettings();
    };
    

    const enableBluetooth = () => {
        if (bluetoothStatus === bluetoothStatusText.PoweredOff) {
            Alert.alert(
            '"SureReserve" would like to use Bluetooth',
            '',
            [
                {
                text: "Don't allow",
                style: 'cancel',
                },
                {
                text: 'Ok',
                onPress: () =>
                    Platform.OS === 'ios'
                    ? openSetting()
                    : manager.enable(),
                },
            ],
            { cancelable: false },
            );
        } else {
            alert('Aleady on');
        }
    };

    const disableBlueTooth = () => {
        if (bluetoothStatus === bluetoothStatusText.PoweredOn) {
            Alert.alert(
            '"SureReserve" would like to Disable Bluetooth',
            '',
            [
                {
                text: "iptal",
                style: 'cancel',
                },
                {
                text: 'tamam',
                onPress: () =>
                    Platform.OS === 'ios'
                    ? openSetting()
                    : manager.disable(),
                },
            ],
            { cancelable: false },
            );
        } else {
            alert('Aleady on');
        }
    }
    

    return [bluetoothStatus,enableBluetooth,disableBlueTooth,manager];
}