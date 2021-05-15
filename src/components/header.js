import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {useTheme} from 'react-native-paper'
const header = () => {

    const {colors} = useTheme()

    return (
        <View style={[styles.container, {backgroundColor: colors.primary}]} >
            <Text style={[styles.text,{color: colors.white}]}>BluetoothApp</Text>
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent:"flex-end",
        height: 130,
    },
    text : {
        fontSize: 20,
        fontWeight: "400",
        alignSelf:"center"
    }
})
