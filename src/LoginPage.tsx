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
    ActivityIndicator,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { setUserLoggedIn } = React.useContext(AuthContext);

    const storeData = async (value: string) => {
        try {
            await AsyncStorage.setItem('token', value);
            return true
        } catch (e) {
            return 'error'
        }
    };

    const handleUserName = (val: string) => {
        setUserName(val)
    }

    const handlePassword = (val: string) => {
        setPassword(val)
    }

    const handleOnPress = () => {
        setIsLoading(true);
        const payload = {
            "email": "eve.holt@reqres.in",
            "password": "password"
        }
        fetch('https://reqres.in/api/login', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return storeData(responseJson.token)
            })
            .then((responseStore) => {
                setIsLoading(false);
                setUserLoggedIn(responseStore)
            })
            .catch((error) => console.log('error ', error))
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
                    <Text style={styles.headeratext}>User Name</Text>
                    <TextInput style={styles.textInput} onChangeText={handleUserName} value={username} />
                    <Text style={styles.headeratext}>Password</Text>
                    <TextInput style={styles.textInput} onChangeText={handlePassword} value={password} />
                    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
                        <Text style={styles.buttonText}>Button</Text>
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

export default LoginPage