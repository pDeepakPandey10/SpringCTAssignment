import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import AddEmployee from './src/AddEmployee';
import LoginPage from './src/LoginPage';
import { AuthContext } from './src/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(false);

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return true;
    } catch (e) {
      return false
    }
  };

  React.useEffect(() => {
    const data = async () => {
      const token = await getData();
      if(token) {
        setUserLoggedIn(true);
      }
    }
    data();
  },[])

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ isUserLoggedIn, setUserLoggedIn }}>
        {
          isUserLoggedIn ? <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen name='AddEmployee' component={AddEmployee} />
          </Stack.Navigator> : <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginPage} />
          </Stack.Navigator>
        }
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;
