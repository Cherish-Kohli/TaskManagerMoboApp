import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const SplashScreenComponent = ({ navigation }) => {
    useEffect(() => {
        async function prepare() {
            try {
                // Prevent the splash screen from hiding
                await SplashScreen.preventAutoHideAsync();

                // Simulate a network request or heavy resource loading
                await new Promise(resolve => setTimeout(resolve, 6000)); // Simulating a 6-second load time

                // After all tasks complete, set the app to ready
                setAppIsReady(true);
            } catch (e) {
                console.warn(e);
            }
        }

        prepare();
    }, []);

    useEffect(() => {
        if (appIsReady) {
            // When the app is ready and the splash screen is still visible, hide it
            SplashScreen.hideAsync().then(() => {
                navigation.replace('Login'); // Navigate when the splash screen hides
            });
        }
    }, [appIsReady, navigation]);

    const [appIsReady, setAppIsReady] = useState(false);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Task Manager</Text>
            <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A90E2',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
    },
});

export default SplashScreenComponent;
