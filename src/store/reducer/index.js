import * as actionTypes from '../actionTypes'
import produce from 'immer'
import {bluetoothStatusText} from '../../utils'


const INITIAL_STATE = {
    BLEList: [], //An Array of Discovered Devices
    color: '#800080', //the Current Color of the LED strip
    connectedDevice: {}, // the current connected BLE device
    status: 'disconnected', // the status of the BLE connection
    deviceBluetoothEnabled : false,
};




const reducer = (draftState = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_BLE:
            draftState.BLEList = action.list;
            return;
        case  actionTypes.SET_CONNECTED_DEVICE:
            draftState.connectedDevice = action.connectedDevice;
            return;

        case actionTypes.DEVICE_BLUETOOTH_ENABLED:
            draftState.deviceBluetoothEnabled = action.isEnabled;
            return;
        case actionTypes.CHANGE_STATUS :
            draftState.status = action.status;
            return;
        default:
            return draftState;
    }
}

export default produce(reducer)