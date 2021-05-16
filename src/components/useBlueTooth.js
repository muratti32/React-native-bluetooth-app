import React, {
    useState,
    useEffect,
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    NativeModules,
    NativeEventEmitter,
    Button,
    Platform,
    PermissionsAndroid,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import BleManager from 'react-native-ble-manager';
import { stringToBytes, bytesToString } from "convert-string";

import {useDispatch,useSelector} from 'react-redux'
import {addBLE,setConnectedDevice,changeDeviceBluetoothEnabled} from '../store/actions'

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default  () => {
    const serviceUUID = 'ffe0'
    const characteristicUUID = 'FFE1'
    const [isScanning, setIsScanning] = useState(false);
    const [peripheralID, setPeripheralID] = useState(null)
    const [isDataFetching, setIsDataFetching] = useState(false)
    const [bluetoothStatus, setBluetoothStatus] = useState(false)
    const peripherals = new Map();
    const [list, setList] = useState([]);

    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const startScan = () => {
        if (!isScanning) {
            BleManager.scan([], 3, true).then((results) => {
                //console.log('Scanning...');
                setIsScanning(true);
            }).catch(err => {
                console.error(err);
            });
        }
    }

    const handleStopScan = () => {
        //console.log('Scan is stopped');
        setIsScanning(false);
    }

    const handleDisconnectedPeripheral = (data) => {
        setIsDataFetching(false)
        let peripheral = peripherals.get(data.peripheral);
        if (peripheral) {
            peripheral.connected = false;
            peripherals.set(peripheral.id, peripheral);
            setList(Array.from(peripherals.values()));
        }
        dispatch(setConnectedDevice(null))
        console.log('Disconnected from ' + data.peripheral);
    }

    const handleUpdateValueForCharacteristic = (data) => {
        console.log('Received data from ' , bytesToString(data.value));
        setIsDataFetching(true);
    }

    const retrieveConnected = () => {
        BleManager.getConnectedPeripherals([]).then((results) => {
            if (results.length == 0) {
                console.log('No connected peripherals')
            }
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var peripheral = results[i];
                peripheral.connected = true;
                peripherals.set(peripheral.id, peripheral);
                setList(Array.from(peripherals.values()));
            }
        });
    }

    const handleDiscoverPeripheral = (peripheral) => {
    
        if (peripheral.name) {
            peripherals.set(peripheral.id, peripheral);
            const listArray =  Array.from(peripherals.values())
            const list = listArray.filter(peripheral => peripheral.name != "NO NAME");
            setList(listArray);
        }
     
    }

    const disConnect = (peripheral) => {
        if (peripheral) {
            if (peripheral.connected) {

                BleManager.disconnect(peripheral.id);

            }
        }
    }

    const connect = (peripheral) => {
        if (peripheral) {
            if (peripheral.connected) {

                BleManager.disconnect(peripheral.id);

            } else {
                BleManager.connect(peripheral.id)
                    .then(() => {
                        let p = peripherals.get(peripheral.id);
                        if (p) {
                            p.connected = true;
                            peripherals.set(peripheral.id, p);
                            setList(Array.from(peripherals.values()));
                        }
                        console.log('Connected to ' + peripheral.id,'  name ' + peripheral.name);

                        setPeripheralID(peripheral.id)
                        dispatch(setConnectedDevice(peripheral));

                        setTimeout(() => {


                            BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
                                console.log(peripheralInfo);
                                var service = 'ffe0';
                                var bakeCharacteristic = 'FFE1';
                                setTimeout(() => {
                                    BleManager.startNotification(peripheral.id, service, bakeCharacteristic)
                                        .then(() => {
                                            console.log('Started notification on ' + peripheral.id);

                                        }).catch((error) => {
                                            console.log('Notification error', error);
                                        });
                                }, 200);
                            });

                        }, 900);
                    }).catch((error) => {
                        console.log('Connection error', error);
                    });
            }
        }
    }

    

    const handleBleManagerDidUpdateState = (args) => {
        const state =  args.state === 'on' ? true : false
        dispatch(changeDeviceBluetoothEnabled(state))
    }


    const enableBlueTooth = () => {

        BleManager.enableBluetooth()
            .then(() => {
                // Success code
                console.log("The bluetooth is already enabled or the user confirm");
            })
            .catch((error) => {
                // Failure code
                console.log("The user refuse to enable bluetooth");
            });
    }




    useEffect(() => {
        BleManager.start({ showAlert: false });
        BleManager.checkState();
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);
        bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
        bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
        bleManagerEmitter.addListener('BleManagerDidUpdateState', handleBleManagerDidUpdateState);

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
        

        return (() => {
            console.log('unmount');
            bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
            bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan);
            bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral);
            bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic);
            bleManagerEmitter.removeListener('BleManagerDidUpdateState', handleBleManagerDidUpdateState);
        })
    }, []);

    const renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';

        return (
            <TouchableHighlight onPress={() => connect(item)}>
                <View style={[styles.row, { backgroundColor: color }]}>
                    <Text style={{ fontSize: 12, textAlign: 'center', color: '#333333', padding: 10 }}>{item.name}</Text>
                    <Text style={{ fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20 }}>{item.id}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    const writeData = (data) => {
        console.log("peripheralID : ",state.connectedDevice.id)
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

    const styles = StyleSheet.create({
        scrollView: {
            backgroundColor: Colors.lighter,
        },
        engine: {
            position: 'absolute',
            right: 0,
        },
        body: {
            backgroundColor: Colors.white,
        },
        sectionContainer: {
            marginTop: 32,
            paddingHorizontal: 24,
        },
        sectionTitle: {
            fontSize: 24,
            fontWeight: '600',
            color: Colors.black,
        },
        sectionDescription: {
            marginTop: 8,
            fontSize: 18,
            fontWeight: '400',
            color: Colors.dark,
        },
        highlight: {
            fontWeight: '700',
        },
        footer: {
            color: Colors.dark,
            fontSize: 12,
            fontWeight: '600',
            padding: 4,
            paddingRight: 12,
            textAlign: 'right',
        },
    });

    return [writeData,connect,disConnect,startScan,list,renderItem,retrieveConnected,enableBlueTooth]
}

