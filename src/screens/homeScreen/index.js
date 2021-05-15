import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native'
import { Button } from 'react-native-paper'
import Header from '../../components/header'
import { useSelector, useDispatch } from 'react-redux'
import { stringToBytes, bytesToString } from "convert-string";
import BleManager from 'react-native-ble-manager';


const homeScreen = ({ navigation }) => {


    const dispatch = useDispatch()
    const state = useSelector(state => state)

    useEffect(() => {

    }, [])

    const izinIste = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permission Localisation Bluetooth',
                    message: 'Requirement for Bluetooth',
                    buttonNeutral: 'Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the Bluetoth");
            } else {
                console.log("Bluetooth permission denied");
            }
        } catch (err) {
            console.log(err);
        }
    }


    const writeData = (data) => {
        const serviceUUID = 'ffe0'
        const characteristicUUID = 'FFE1'
        const convertedData = stringToBytes(data);
        if (state.connectedDevice) {
            BleManager.write(
                state.connectedDevice.id,
                serviceUUID,
                characteristicUUID,
                convertedData
            )
                .then(() => {
                    // Success code
                })
                .catch((error) => {
                    // Failure code
                    console.log(error);
                });
        }
    }


    const write = () => {
        writeData("X")
    }



    const gotoSettings = () => {
        navigation.navigate("settings")
    }



    useEffect(() => {
        //console.log(" state son hal ",  state.selectedDevice )
    }, [state])


    return (
        <View>
            <Header />
            <Text>Home Screen</Text>

            <Button
                style={{ marginTop: 10 }}
                icon="camera" mode="contained"
                onPress={write} >
                write data
            </Button>

            <Button
                style={{ marginTop: 10 }}
                icon="camera" mode="contained"
                onPress={gotoSettings} >
                goto settings
            </Button>

        </View>
    )
}


export default homeScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
