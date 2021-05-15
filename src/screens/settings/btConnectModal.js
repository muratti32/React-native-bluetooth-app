import React from 'react'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import {useDispatch} from 'react-redux'
import {connectDevice} from '../../store/actions'

const btConnectModal = (props) => {

    const dispatch = useDispatch()

    const { modalVisible, setModalVisible,selectedItem } = props

    const Item = () => (
        <View style = {styles.item}>
            <Text style={styles.deviceNameText}>{selectedItem.name}</Text>
            <Text style={styles.deviceMacText}>{selectedItem.id}</Text>
        </View>
    )
    

    const handleBaglan = () => {
        setModalVisible(!modalVisible)
        //dispatch(connectDevice(selectedItem))
    }
    const handleIptal = () => {
        setModalVisible(!modalVisible)
    }
    
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType=""
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Item />
                        <Text style={styles.modalText}>Bu Cihazla bağlantı kur</Text>
                        <View style={styles.buttonGroup}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={handleIptal}
                            >
                                <Text style={styles.textStyle}>İptal</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonConnect]}
                                onPress={handleBaglan}
                            >
                                <Text style={styles.textStyle}>Bağlan</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default btConnectModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 9,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 7,
        padding: 10,
        elevation: 2
    },
    buttonGroup: {
        
        flexDirection : "row",
        justifyContent : "space-evenly",
        alignItems : "stretch"
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        width : 100,
    },
    buttonConnect: {
        marginStart : 10,
        backgroundColor: "#2196F3",
        width : 100,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    deviceMacText: {
        color:"gray",
    },
    deviceNameText: {
        fontWeight: "bold",
        fontSize:16,
    },
    item: {
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 10,
        borderWidth: 1,
        padding:5,
        borderRadius:3,
    }

})
