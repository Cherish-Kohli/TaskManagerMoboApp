import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);
    const [error, setError] = useState('');

    const handleSignup = () => {
        if (!email || !password || !confirmPassword) {
            setError('Please fill all fields');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Add more validation or API calls for registration here
        console.log('Signup successful with:', email, password);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirmPasswordVisibility);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
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
            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
                style={styles.input}
                mode="outlined"
                secureTextEntry={confirmPasswordVisibility}
                right={<TextInput.Icon name={confirmPasswordVisibility ? "eye" : "eye-off"} onPress={toggleConfirmPasswordVisibility} />}
            />
            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>
            <Button mode="contained" onPress={handleSignup} style={styles.button}>
                Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
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

export default SignupScreen;
