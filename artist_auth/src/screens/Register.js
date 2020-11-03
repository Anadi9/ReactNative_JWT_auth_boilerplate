/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Hand1 from '../assets/hand1.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendCred = async (props) => {
        await fetch('http://192.168.1.6:8080/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: await JSON.stringify({
                'name': name,
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
        <View style={styles.register}>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <Image source={Hand1} style={styles.img} />
            <Text style={{ fontSize: 25, fontWeight: '700', marginVertical: 5 }}>Hello! Join Us </Text>
            <Text style={{ fontSize: 15, fontWeight: '500', marginVertical: 5 }}>Create new account </Text>
            </View>
            <View style={{marginHorizontal: 30,}}>
            <TextInput style={styles.input} label="Name" placeholder="Enter name" selectionColor="#000" value={name} onChangeText={(text) => setName(text)} />
            <TextInput style={styles.input} keyboardType="email-address" label="Email" placeholder="Enter email" selectionColor="#000" textContentType="emailAddress" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput style={[styles.input, {marginBottom: 30}]} secureTextEntry={true} label="Password" placeholder="Enter password" selectionColor="#000" textContentType="password" value={password} onChangeText={(text) => setPassword(text)} />
            <Button title="Register" onPress={() => sendCred(props)} />
            </View>
            <View style={{marginVertical: 50,justifyContent: 'center',alignItems: 'center'}}>
                <Text>Already have an account?</Text>
                <TouchableOpacity style={styles.login} onPress={() => props.navigation.navigate('Login')}>
                   <Text style={{color: '#26C6DA',fontSize: 15,fontWeight: '700'}}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    register: {
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
    login: {
        width: 90,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RegisterScreen;
