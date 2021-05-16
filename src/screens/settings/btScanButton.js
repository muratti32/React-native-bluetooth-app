import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from "lodash"

const btOpenCloseButton = ({ setType, retrieveConnected, startScan,setModalVisible }) => {

    const { colors } = useTheme()

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const scanDevice = () => {
        if (checkBluetoothState()) {
            setType("retrieve")
            retrieveConnected()
        } else {
            setType("scan")
            startScan()
        }
        setModalVisible(true)
    }


    const checkBluetoothState = () => {
        if (state.connectedDevice == null || state.connectedDevice === undefined
            || isEmpty(state.connectedDevice))
            return false;
        else
            return true;
    }

    const buttonStyle = () => {
        return {
            flexDirection: "row",
            borderWidth: 1,
            borderColor: colors.primary,
            marginTop: 10,
            marginHorizontal: 9,
            height: 40,
            alignItems: "center",
            paddingHorizontal: 11,
            backgroundColor: colors.primary
        }
    }

    const buttonTextStyle = (params) => {
        return {
            color: colors.white,
            fontSize: 17,
            fontWeight: "700"
        }
    }




    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                style={buttonStyle()}
                onPress={scanDevice}
            >
                <View style={styles.icon}>
                    <Icon name={"bluetooth-audio"} size={28} color={colors.white} />
                </View>
                <View style={styles.text}>
                    <Text style={buttonTextStyle()}>  {checkBluetoothState() ? "Bağlı Cihazlar" : "Cihaz Tara"}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default btOpenCloseButton

const styles = StyleSheet.create({
    icon: {
        marginEnd: 11,
    },
})
