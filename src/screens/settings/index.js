import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import useBlueTooth from '../../components/useBlueTooth'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/header'
import BtInfoRow from './btInfoRow'
import BtOpenCloseButton from './btOpenCloseButton'
import BtDeviceList from './btDeviceList'
import ModalMenu from '../../components/ModalMenu'
import { useDispatch, useSelector } from 'react-redux'
import { addBLE, setConnectedDevice, startScan } from '../store/actions'
import { stringToBytes, bytesToString } from "convert-string";
import BleManager from 'react-native-ble-manager';

const Settings = () => {
    const [modalVisible, setModalVisible] = useState(false)

    //Modal içerisinde gösterilecek liste
    const [bluetoothList, setBluetoothList] = useState([])

    //Modal tipi
    const [type, setType] = useState("")


    const [writeData, connect,disConnect, startScan, list, renderItem, retrieveConnected, enableBlueTooth] = useBlueTooth()

    const { colors } = useTheme()


    const dispatch = useDispatch()

    const state = useSelector(state => state);

    useEffect(() => {
    }, [list])

    const sendData = (data) => {
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

    console.log("state.connectedDevice : ",state.connectedDevice)
    const scanDevice = () => {
        if(state.connectedDevice == null){
            setType("scan")
            startScan()
        }else{
            setType("retrieve")
            retrieveConnected()
        }
        
        setModalVisible(true)
    }

    const write = () => {
        sendData("X")
    }

    const retrieve = () => {
        
        setType("retrieve")
        setModalVisible(true)
    }


    return (
        <>
            <ModalMenu
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                data={list}
                connect={connect}
                type={type}
            />
            <Header />
            <BtInfoRow />
            <BtOpenCloseButton enableBlueTooth={enableBlueTooth} />

            <Button
                style={{ marginTop: 10,marginHorizontal:10, }}
                icon="camera" mode="contained"
                onPress={scanDevice} >
                {state.connectedDevice == null ? "Cihaz Tara":"Bağlı Cihazlar"}
            </Button>

        </>
    )
}

export default Settings

const styles = StyleSheet.create({
    deviceList: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginTop: 10,
        marginHorizontal: 9,
    }
})
