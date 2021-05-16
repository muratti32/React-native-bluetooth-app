import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';

const deviceClock = () => {

    const [time, setTime] = useState(new Date().toLocaleTimeString())
    const { colors } = useTheme()

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
        }, 1000);
        return () => {
            clearInterval(timer)
        };
    }, [])


    const Clock = () => {
        return (
            <View style={styles.clockContainer}>
                <Text style={styles.clockTitle} >Saat</Text>
                <Text style={styles.clock} >{time} </Text>
            </View>
        )
    }

    const handleSyncButtonPress = () => {
        console.log("sync button pressed")
    }


    const ClockSyncButton = () => {
        return (
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleSyncButtonPress}
            style={[styles.clockSyncButton, { backgroundColor: colors.primary }]}>
                <Icon name={"sync"} size={28} color={colors.white} />
                <Text style={styles.syncButtonText} >Eşitle</Text>
            </TouchableOpacity>
        )
    }

    const DeviceClock = () => {
        return (
            <View style={styles.clockContainer}>
                <Text style={styles.clockTitle} >Cihaz saati</Text>
                <Text style={styles.clock} >{time} </Text>
            </View>
        )
    }


    return (
        <View style={[styles.container, { borderColor: colors.primary }]} >
            <Clock />
            <ClockSyncButton />
            <DeviceClock />

        </View>
    )
}

export default deviceClock

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 9,
        borderWidth: 1,
        justifyContent: 'space-between',
        padding: 9,
    },
    clockTitle: {
        fontWeight: "500",
        fontSize: 17,
    },
    clock: {
        fontSize: 15,
    },
    clockContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    clockSyncButton: {
        padding: 9,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 7,
        flexDirection: 'row',
    },
    syncButtonText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 17
    }
})
