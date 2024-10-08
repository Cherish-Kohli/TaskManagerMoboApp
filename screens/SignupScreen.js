// Initialize state variables for user inputs and form validation.

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  const [error, setError] = useState("");

  // Handles user registration by validating input and sending a POST request to the server.

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://192.168.1.106:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log("Signup successful:", json);
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      } else {
        const errorResponse = await response.text(); // Get text instead of json to avoid parsing error
        console.error("Signup failed with response:", errorResponse);
        setError(errorResponse || "Signup failed");
      }
    } catch (error) {
      console.error("Signup request error:", error);
      setError("Network error or server is unreachable."); // Display any validation or server response errors to the user.
    }
  };

  // Toggle the visibility of the password and confirm password fields.

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility);
  };

  // Render the user interface for the signup form including text inputs for email and passwords.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        right={<TextInput.Icon name="email" />}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry={passwordVisibility}
        right={
          <TextInput.Icon
            name={passwordVisibility ? "eye" : "eye-off"}
            onPress={togglePasswordVisibility}
          />
        }
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
        mode="outlined"
        secureTextEntry={confirmPasswordVisibility}
        right={
          <TextInput.Icon
            name={confirmPasswordVisibility ? "eye" : "eye-off"}
            onPress={toggleConfirmPasswordVisibility}
          />
        }
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
      </Button>

      {/* Redirects to the login screen upon successful signup or displays error messages on failure. */}

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the Signup screen's layout and form elements.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6200ee",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    backgroundColor: "#6200ee",
  },
  link: {
    marginTop: 20,
    color: "#6200ee",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SignupScreen;
