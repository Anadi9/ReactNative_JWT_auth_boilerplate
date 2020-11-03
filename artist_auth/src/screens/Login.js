/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Button, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Hand2 from '../assets/hand2.png';

function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendCred = async (props) => {
        await fetch('http://192.168.1.6:8080/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: await JSON.stringify({
                'email': email,
                'password': password,
            }),
        }).then(res=>res.json())
            .then(async (data) => {
                console.log(data);
               try {
                   await AsyncStorage.setItem('token', data.token);
                   props.navigation.replace('Home');
               } catch (e) {
                   console.log(e);
               }
            }).catch(function(error) {
                console.log(error.message);
                });
    };

    return (
        <KeyboardAvoidingView behavior="position">
        <View style={styles.login}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Image source={Hand2} style={styles.img} />
            <Text style={{ fontSize: 25, fontWeight: '700', marginVertical: 5 }}>Welcome back!</Text>
            <Text style={{ fontSize: 15, fontWeight: '500', marginVertical: 5 }}>Log in to your account</Text>
            </View>
            <View style={{marginHorizontal: 30,}}>
            <TextInput style={styles.input} keyboardType="email-address" label="Email" placeholder="Enter email" selectionColor="#000" textContentType="emailAddress" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput style={[styles.input, {marginBottom: 30}]} secureTextEntry={true} label="Password" placeholder="Enter password" selectionColor="#000" textContentType="password" value={password} onChangeText={(text) => setPassword(text)} />
            <Button title="Login" onPress={() => sendCred(props)} />
            </View>
            <View style={{marginVertical: 50,justifyContent: 'center',alignItems: 'center'}}>
                <Text>Do not have an account?</Text>
                <TouchableOpacity style={styles.register} onPress={() => props.navigation.navigate('Register')}>
                   <Text style={{color: '#26C6DA',fontSize: 15,fontWeight: '700'}}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    login: {
        justifyContent: 'center',
    },
    img: {
        marginTop: 40,
        width: 200,
        height: 200,
    },
    input: {
        marginVertical: 15,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    },
    register: {
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;
