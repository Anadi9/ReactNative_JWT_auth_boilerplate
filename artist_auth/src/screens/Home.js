/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import Bgvideo from '../assets/video.mp4';

function HomeScreen(props) {

    const logout = (props) => {
        AsyncStorage.removeItem('token').then(() => {
            props.navigation.replace('Login');
        });
    };

    return (
        <View style={styles.home}>
            <View style={{marginTop: 40,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{ fontSize: 25, fontWeight: '700', marginVertical: 5 }}>Artist Home</Text>
            </View>
            <Video source={Bgvideo}
             onBuffer={props.onBuffer}
             onError={props.videoError}
             style={styles.backgroundVideo} />
            <View style={{marginHorizontal: 170, marginVertical: 50}}>
            <Button title="Log Out" onPress={() => logout(props)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    home: {
        justifyContent: 'center',
    },
    backgroundVideo: {
        marginVertical: 50,
        width: '100%',
        height: 400,
    },
});

export default HomeScreen;
