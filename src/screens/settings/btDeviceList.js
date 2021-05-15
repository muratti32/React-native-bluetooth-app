import React,{useState} from 'react'
import { StyleSheet, Text, View,FlatList,TouchableOpacity,TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {useTheme} from 'react-native-paper'
import BtConnectModal from './btConnectModal'
import {useSelector,useDispatch} from 'react-redux';



const btDeviceList = () => {

    const deviceList = useSelector(state => state)


    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})

    const {colors} = useTheme()

    const getDevice = (item) => {
        // const device = deviceList.BLEList.find(device => device.id === item.id)
        // device ? setSelectedItem(device) : null
    }
    
    
    const handleLongPress = (item) => {
        getDevice(item)
        setModalVisible(true);
    }

    const Item = ({item} ) => (
        <TouchableOpacity 
        activeOpacity={0.4}
        onLongPress={()=>handleLongPress(item)}
        style = {styles.item}>
            <View style={styles.left} >
                <Icon name={"bluetooth"} size={32} color={colors.primary}/>
            </View>
            <View style={styles.right}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.macText}>{item.id}</Text>
            </View>
            
        </TouchableOpacity>
    );



    const renderItem = ({ item }) => (
        <Item item={item} />
    );


    return (
        <View>
            <BtConnectModal 
                modalVisible = {modalVisible} 
                setModalVisible={setModalVisible}
                selectedItem={selectedItem}  />
            <FlatList
                data={deviceList.BLEList}
                renderItem={renderItem}
                keyExtractor={name => name.id}
            />
        </View>
    )
}

export default btDeviceList

const styles = StyleSheet.create({
    item: {
        flexDirection:"row",
        alignItems: 'center',
        marginTop: 13,
    },
    nameText: {
        fontSize: 19,
    },
    macText: {
        fontSize: 15,
        color : "gray"

    },
    left:{
        marginEnd:3,
    }
})
