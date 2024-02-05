import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type itemI = {
    name: string
}


const HomeScreen = () => {
    const [data, setData] = React.useState([]);

    const navigation = useNavigation();

    const getData = async () => {
        try {
            const empData = await AsyncStorage.getItem('employees');
            if (empData && JSON.parse(empData).length > 0) {
                setData(JSON.parse(empData));
            }
        } catch (e) {
            return false
        }
    };

    React.useEffect(() => {
        getData()
    }, []);

    const handleNavigation = () => {
        navigation.navigate('AddEmployee')
    }
    const handleRenderItem = ({item}) => {
        console.log('item ',JSON.stringify(item));
        return (
            <View style={{
                width: '100%',
                marginVertical: 5,
                padding: 10,
                borderWidth: 1,
                borderColor: '#cecece'
            }}>
                <Text>name <Text>surname</Text></Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>AGE</Text>
                    <Text style={{ flex: 1, flexWrap: 'wrap' }}>Address</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, padding: 18 }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                {
                    data.length == 0 ? <View style={{ flex: 1}}/> : <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <FlatList data={data} renderItem={handleRenderItem} />
                    </View>
                }
                <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                    <Text style={styles.buttonText}>Add Employee</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        maxHeight: 45,
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: 'blue',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white'
    }
});

export default HomeScreen