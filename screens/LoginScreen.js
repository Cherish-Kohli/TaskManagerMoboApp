import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill all fields');
            return;
        }
        try {
            const response = await fetch('http://172.20.10.2:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password,
                }),
            });
            const json = await response.json();
            if (response.status === 200) {
                console.log('Login successful:', json);
                navigation.navigate('Main'); // Assuming 'Main' is your home screen route name
            } else {
                setError(json.message || 'Authentication failed');
            }
        } catch (error) {
            setError('Network error');
            console.error('Login request error:', error);
        }
    };
    

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                right={<TextInput.Icon name="email" />}
            />
            <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                mode="outlined"
                secureTextEntry={passwordVisibility}
                right={<TextInput.Icon name={passwordVisibility ? "eye" : "eye-off"} onPress={togglePasswordVisibility} />}
            />
            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>
            <Button mode="contained" onPress={handleLogin} style={styles.button}>
                Login
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#6200ee'
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        paddingVertical: 8,
        backgroundColor: '#6200ee'
    },
    link: {
        marginTop: 20,
        color: '#6200ee',
        textAlign: 'center',
        fontSize: 16
    }
});

export default LoginScreen;
