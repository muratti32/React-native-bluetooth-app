import { Linking } from 'react-native'

import * as actionTypes from '../actionTypes'
import { bluetoothStatusText } from '../../utils'



export const addBLE = (list) => ({
    type: "ADD_BLE",
    list : list
})

export const setConnectedDevice = (device) => ({
    type: actionTypes.SET_CONNECTED_DEVICE,
    connectedDevice: device
});


export const write = (status) => ({
    type: "CHANGE_STATUS",
    status: status
});

export const changeDeviceBluetoothEnabled = (isEnabled) => ({
    type: actionTypes.DEVICE_BLUETOOTH_ENABLED,
    isEnabled: isEnabled
});

const openSetting = () => {
    Linking.openSettings();
};



export const enableBluetooth = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        console.log("thunk startScan: ");
        const subscription = DeviceManager.onStateChange((state) => {
            if (state === bluetoothStatusText.PoweredOff) {
                Platform.OS === 'ios'
                    ? openSetting()
                    : DeviceManager.enable()
                subscription.remove();
            }
        }, true);

    };
}


