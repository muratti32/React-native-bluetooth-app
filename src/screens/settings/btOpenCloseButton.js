import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
import {enableBluetooth,disableBluetooth} from '../../store/actions'

const btOpenCloseButton = ({enableBlueTooth}) => {

    const {colors} = useTheme()

    const durum = useSelector(state => state.deviceBluetoothEnabled)
    const dispatch = useDispatch()

    const buttonStyle = () => {
        return {
            flexDirection : "row",
            borderWidth :1,
            borderColor : colors.primary,
            marginTop : 10,
            marginHorizontal : 9,
            height : 40,
            alignItems : "center",
            paddingHorizontal : 11,
            backgroundColor : colors.primary
        }
    }

    const buttonTextStyle = (params) => {
        return {
            color: colors.white,
            fontSize:17,
            fontWeight: "700"
        }
    }
    


    const handlePress = () => {
        if(durum === false){
            enableBlueTooth()
        }
    }
    
    
    return (
        <View>
        { (durum === false) &&
        <TouchableOpacity
        activeOpacity ={0.5}
        style={buttonStyle()} 
        onPress = {handlePress}
        >
            <View style={styles.icon}>
                <Icon name={durum ? "bluetooth-connected": "bluetooth"} size={28} color={colors.white}/>
            </View>
            <View style={styles.text}>
                <Text style={buttonTextStyle()}> {durum ? "Bluetooth Kapat":"Bluetooth Aç"} </Text>
            </View>
        </TouchableOpacity>
        }
        </View>
    )
}

export default btOpenCloseButton

const styles = StyleSheet.create({
    icon: {
        marginEnd:13,
    },
})
