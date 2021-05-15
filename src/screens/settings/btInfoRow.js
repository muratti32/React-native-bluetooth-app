import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux'

const btInfoRow = (props) => {

    const state = useSelector(state => state)
    const durum = state.deviceBluetoothEnabled

    const { colors } = useTheme()

    return (
        <View style={[styles.container, { borderColor: colors.primary }]}>
            <View style={styles.solBaslik} >
                <View style={[styles.icon, { backgroundColor: colors.primary }]}>
                    <Icon name={durum ? "bluetooth-connected" : "bluetooth"} size={28} color={colors.white} />
                </View>
            </View>
            <View style={styles.durum} >
                <Text style={styles.text} >Bluetooth Durum</Text>
                <Text style={[styles.durumButtonText, { color: durum ? "green" : "red" }]}>{durum ? "Açık" : "Kapalı"} </Text>
            </View>
            <View style={styles.durum}>
                <Text style={styles.text} >Bağlı Cihaz</Text>
                <Text style={[styles.durumButtonText, { color: state.connectedDevice ? "green" : "red" }]}>{state.connectedDevice ? state.connectedDevice.name : " Cihaz Yok"} </Text>
            </View>
            {/* <View style={[styles.durumText]}>
                
                <Text style={[styles.durumButtonText,{color : durum ? "green" : "red"}]}>{durum ? "Açık":"Kapalı"} </Text>
            </View>
            <View style={[styles.durumText]}>
                <Text style={styles.text} >Cihaza Bağlı</Text>
                <Text style={[styles.durumButtonText,{color : durum ? "green" : "red"}]}>{durum ? "Açık":"Kapalı"} </Text>
            </View> */}
        </View>
    )
}

export default btInfoRow

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 20,
        marginHorizontal: 9,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    solBaslik: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        marginLeft: 11,
    },
    durumText: {
        marginRight: 9,
    },
    durum: {
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 9,
    }
})
