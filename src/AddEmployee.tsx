import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEmployee = () => {
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleUserName = (val: string) => {
        setUserName(val)
    }

    const handlePassword = (val: string) => {
        setPassword(val)
    }

    const handleAddress = (val: string) => {
        setAddress(val)
    }

    const handleCity = (val: string) => {
        setCity(val)
    }

    const getAllEmployees = async () => {
        let data = await AsyncStorage.getItem('employees');
        return data
    }

    const storeData = async (val: string) => {
        try {
            await AsyncStorage.setItem('employees', val);
            return true
        } catch (e) {
            return 'error'
        } 
    }

    const handleAddEmployee = async () => {
        if(username == '' || password=='' || address == '' || city == '') {
            return Alert.alert('please fill all details');
        } else {
            setIsLoading(true);
            const savedata = {
                name: username,
                age: password,
                address: address,
                city: city
            }
            const OldEmployees = await getAllEmployees();
            if(OldEmployees) {
                let OldEmployeesJson = JSON.parse(OldEmployees);
                OldEmployeesJson.push(savedata)
                storeData(JSON.stringify(OldEmployeesJson));
            } else {
                storeData(JSON.stringify([savedata]));
            }
            setUserName('');
            setPassword('');
            setAddress('');
            setCity('');
            setIsLoading(false);
            return Alert.alert('Added Successfully');
        }
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={'blue'} />
            </View>
        )
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <SafeAreaView style={{ flex: 1, padding: 18 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={styles.headeratext}>Name</Text>
                    <TextInput style={styles.textInput} onChangeText={handleUserName} value={username} />
                    <Text style={styles.headeratext}>Age</Text>
                    <TextInput style={styles.textInput} onChangeText={handlePassword} value={password} keyboardType='number-pad' />
                    <Text style={styles.headeratext}>Address</Text>
                    <TextInput style={styles.textInput} onChangeText={handleAddress} value={address} />
                    <Text style={styles.headeratext}>City</Text>
                    <TextInput style={styles.textInput} onChangeText={handleCity} value={city} />
                    <TouchableOpacity style={styles.button} onPress={handleAddEmployee}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    textInput: {
        maxHeight: 50,
        flex: 1,
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    headeratext: {
        marginVertical: 10
    },
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

export default AddEmployee