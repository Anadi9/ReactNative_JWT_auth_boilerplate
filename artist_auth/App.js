/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterScreen from './src/screens/Register';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/Home';
import LoadingScreen from './src/screens/LoadingScreen';



const Stack = createStackNavigator();

const App = () => {

  const [loggedin, setLoggedin] = useState(false);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };

  useEffect(() => {
    detectLogin();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
