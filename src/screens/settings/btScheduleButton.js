import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'

const btScheduleButton = ({enableBlueTooth}) => {

    const {colors} = useTheme()

    const navigation = useNavigation()
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
        navigation.navigate('schedule')
    }
    
    
    return (
        <View>
        <TouchableOpacity
        activeOpacity ={0.5}
        style={buttonStyle()} 
        onPress = {handlePress}
        >
            <View style={styles.icon}>
                <Icon name={"schedule"} size={28} color={colors.white}/>
            </View>
            <View style={styles.text}>
                <Text style={buttonTextStyle()}> Programla </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default btScheduleButton

const styles = StyleSheet.create({
    icon: {
        marginEnd:13,
    },
})
