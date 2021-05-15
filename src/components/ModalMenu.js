import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, FlatList, RefreshControl, KeyboardAvoidingView } from 'react-native'
import BackButtonIcon from './icons/BackButtonIcon'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useSelector, useDispatch } from 'react-redux';

const ModalMenu = (props) => {

    const { modalVisible, setModalVisible, connect, data ,type} = props

    const { colors } = useTheme()

    const insets = useSafeAreaInsets()


    //The state that holds the elements to show in the menu
    const [listItems, setListItems] = useState([])




    useEffect(() => {

        setListItems(data)

    }, [modalVisible])




    //Menu Items
    const Item = ({ item }) => {
        const color = item.connected ? 'green' : '#fff';

        return (
            <View style={[styles.navBar]}>
                <View style={{ marginEnd: 3, }}>
                <Icon name={item.connected  ? "bluetooth-connected": "bluetooth"} size={28} color={color}/>


                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.modalText}>{item.name}</Text>
                    {item.subItem ? <Text style={styles.modalTextSub}>{item.id}</Text> : null}
                </View>

            </View>
        )
    }

    const handleRenderItemPress = (item) => {
        connect(item)

        setModalVisible(false)
    }

    //Flatlist method
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ ...styles.openButtons }}
                onPress={() => { handleRenderItemPress(item) }}>
                <Item item={item} />
            </TouchableOpacity>
        )
    }

    const renderSeparator = () => (
        <View style={styles.seperator} />
    )

    const ListHeaderComponent = () => (
        <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle} >{type == "scan" ? "Bağlan":"Bağlantı kes"} </Text>
        </View>
            
    )



    const getItems = () => {
        return (
            <View style={styles.insideCard}>

                <View style={styles.list} >
                    {
                        <FlatList
                            data={listItems}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                            ListHeaderComponent={ListHeaderComponent}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            keyExtractor={(item, index) => index.toString()} />

                    }

                </View>
            </View>
        )
    }


    const handleBackButtonPress = () => {
        setModalVisible(false)
    }


    const BackButton = () => {
        return (
            <TouchableOpacity
                onPress={() => { handleBackButtonPress() }}>
                <BackButtonIcon />
            </TouchableOpacity>
        )
    }

    const handleShowModal = () => {
        setListItems(data)
    }


    const getModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                cancelable={true}
                visible={modalVisible}
                onShow={handleShowModal}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={"padding"} style={{ flex: 1, backgroundColor: '#505056' }}>
                    <View style={[styles.header, { marginTop: insets.top === 0 ? 25 : insets.top }]}  >
                        <BackButton />
                        <Text style={styles.headerTitle} >Bluetooth cihazlar</Text>
                    </View>
                    <View
                        style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {getItems()}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        )
    }

    return (
        <View>
            {getModal()}
        </View>
    )
}

export default ModalMenu

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: '#505056',
        padding: 20,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "stretch",
    },
    openButton: {
        borderRadius: 6,
        elevation: 2,
        marginTop: 3,
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "left"
    },
    modalText: {
        fontFamily: "OpenSans-Regular",
        marginBottom: 5,
        fontSize: 12,
        textAlign: "left",
        fontWeight: "500",
    },
    modalTextSub: {
        fontFamily: "OpenSans-Regular",
        marginBottom: 5,
        fontSize: 10,
        textAlign: "left",
    },
    circle: {
        width: 39,
        height: 39,
        marginRight: 5,
        borderRadius: 200 / 2,
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBar: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightIcon: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
    },
    insideCardTitle: {
        flexDirection: 'row',
        backgroundColor: '#E5C77A',
        height: 39,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderTopEndRadius: 6,
        borderTopStartRadius: 6,
    },
    insideCardText: {
        flex: 1,
        marginStart: 5,
    },
    insideCard: {
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 6,

    },
    list: {
        paddingHorizontal: 14,
        paddingVertical: 25,
    },
    seperator: {
        backgroundColor: '#E5C77A',
        height: 1,
        marginHorizontal: 7,
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginEnd: 19,
        marginStart: 19,
    },
    headerTitle: {
        zIndex: 1,
        elevation: 1,
        fontWeight: "300",
        fontSize: 19,
        color: '#E5C77A',
    },
    listHeaderTitle: {
        fontWeight:"200",
        fontSize:19,
        color:"#E5C77A",
    },
    listHeader: {
        marginBottom: 10,
        marginTop: 0,
        alignItems: "center",
    }
})
