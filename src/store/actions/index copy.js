import { Linking } from 'react-native'
import { Buffer } from 'buffer'

import * as actionTypes from '../actionTypes'
import { bluetoothStatusText } from '../../utils'

export const addBLE = (device) => ({
    type: "ADD_BLE",
    device
})

export const changedColor = (color) => ({
    type: "CHANGED_COLOR",
    newColor: color
})

export const connectedDevice = (device) => ({
    type: "CONNECTED_DEVICE",
    connectedDevice: device
});

export const changeStatus = (status) => ({
    type: "CHANGE_STATUS",
    status: status
});

export const changeDeviceBluetoothEnabled = (isEnabled) => ({
    type: actionTypes.DEVICE_BLUETOOTH_ENABLED,
    isEnabled: isEnabled
});


export const checkBluetoothState = () => {
    return (dispatch, getState, DeviceManager) => {
        console.log("thunk startScan: ");
        const subscription = DeviceManager.onStateChange((state) => {
            switch (state) {
                case bluetoothStatusText.PoweredOn:
                    dispatch(changeDeviceBluetoothEnabled(true));
                    break;
                case bluetoothStatusText.PoweredOff:
                    dispatch(changeDeviceBluetoothEnabled(false));
                    break;
            }
            subscription.remove();
        }, true);

    };
}

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
export const disableBluetooth = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        console.log("thunk startScan: ");
        const subscription = DeviceManager.onStateChange((state) => {
            if (state === bluetoothStatusText.PoweredOn) {
                Platform.OS === 'ios'
                    ? openSetting()
                    : DeviceManager.disable()
                subscription.remove();
            }
        }, true);

    };
}


export const startScan = () => {
    return (dispatch, getState, DeviceManager) => {
        // you can use Device Manager here
        const subscription = DeviceManager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                dispatch(scan());
                subscription.remove();
            }
        }, true);
    };
}

export const scan = () => {
    return (dispatch, getState, DeviceManager) => {
        DeviceManager.startDeviceScan(null, null, (error, device) => {
            dispatch(changeStatus("Scanning"));
            if (error) {
                console.error(error);
            }
            if (device !== null) {
                // console.log("deviceID : ",device.id," device.isConnectable : ",device.isConnectable,"  device.name : ",device.name," device.localName :",device.localName)
                dispatch(addBLE(device));
            }
        });
    }
}



export const connectDevice = (device) => {
    return (dispatch, getState, DeviceManager) => {
        dispatch(changeStatus("Connecting"));
        DeviceManager.stopDeviceScan()
        device.connect()
            .then((device) => {
                dispatch(changeStatus("Discovering"));
                let characteristics = device.discoverAllServicesAndCharacteristics()
                //getServicesAndCharacteristics(characteristics)

                return characteristics;
            })
            .then((device) => {
                dispatch(changeStatus("Setting Notifications"));
                return device;
            })
            .then((device) => {
                dispatch(changeStatus("Listening"));
                dispatch(connectedDevice(device))

                return device;
            }, (error) => {
                console.log(this._logError("SCAN", error));
                //return null;
            })
    }
}

export const updateColor = (newcolor) => {
    return (dispatch, getState, DeviceManager) => {
        const state = getState();
        console.log("thunk update color: ", state.BLEs.connectedDevice);
        try {
            // this.info("Updating Device")
            let base64 = Base64.btoa(unescape(encodeURIComponent(newcolor)));
            let LEDResponse = state.BLEs.connectedDevice.writeCharacteristicWithResponseForService("00010000-89BD-43C8-9231-40F6E305F96D", "00010001-89BD-43C8-9231-40F6E305F96D", base64)
            dispatch(changeStatus("Changing Color"));
            dispatch(changedColor(newcolor));
            return true;
        } catch (error) {
            console.log("update Error:", error)
            return false;
        }
    }
}

serviceUUIDs = "0000ffe0-0000-1000-8000-00805f9b34fb"
serviceData = "0000b000-0000-1000-8000-00805f9b34fb"

export const read1 = () => {

    return (dispatch, getState, DeviceManager) => {
        const state = getState();
        try {
            state.connectedDevice
                .readCharacteristicForService("0000ffe0-0000-1000-8000-00805f9b34fb", "0000ffe1-0000-1000-8000-00805f9b34fb")
                .then((readCharacteristic) => {
                    const heightInCentimeters = Buffer.from(readCharacteristic.value, 'base64');
                    console.log("heightInCentimeters : ", heightInCentimeters.data)
                    //         console.log("Is Characteristics Readable:", update.isReadable);
                    //         console.log("Heart Rate Data:", base64.decode(update.value));
                    //         // const readCharacteristic = await device.readCharacteristicForService(userDataServiceUUID, 
                    //         // var data = new Uint16Array(base64.decode(update.value));
                })
                .catch((error) => {
                    console.log("read error:", error)
                })

            return true;
        } catch (error) {
            console.log("update Error:", error)
            return false;
        }
    }
}

