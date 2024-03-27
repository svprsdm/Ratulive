import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
const listTab = [
    {
        status: 'All'
    },
    {
        status: 'Password'
    },
    {
        status: 'Crown'
    },
]
const data = [
    {
        name: 'New',
        status: 'All'
    },
    {
        name: 'Text feild',
        status: 'Password'
    },
    {
        name: 'Crown',
        status: 'Crown'
    },
]
const GoLiveAddTitle = () => {
    const [status, setStatus] = useState('All')
    const [datalist, setDataList] = useState(data)
    const setStatusFilter = status => {
        if (status !== 'All') {
            setDataList([...data.filter(e => e.status === status)])
        } else {
            setDataList(data)
        }
        setStatus(status)
    }
    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View>
                    <Text style={{ color: '#000' }}>{item.name}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listTab}>
                {
                    listTab.map(e => (
                        <TouchableOpacity
                            style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                            onPress={() => setStatusFilter(e.status)}
                        >
                            <Text styles={styles.textTab, status === e.status && styles.textTabActive}>
                                {e.status}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <FlatList
                data={datalist}
                keyExtractor={(e, i) => i.toString()}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}
export default GoLiveAddTitle
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 10,
        justifyContent: 'center',
    },
    listTab: {
        alignSelf: 'center',
        flexDirection: 'row'
        // color: '#fff'
    },
    btnTab: {
        width: Dimensions.get('window').width / 3.5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#000',
        padding: 10,
        justifyContent: 'center',
        margin: 10
    },
    textTab: {
        fontSize: 16,
    },
    btnTabActive: {
        backgroundColor: '#ccc',
    },
    textTabActive: {
        color: '#fff'
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 10
    }
})
