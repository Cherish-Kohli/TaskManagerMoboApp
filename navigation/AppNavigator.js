// navigation/AppNavigator.js

// Initialize the stack navigator to manage the navigation stack of the application.

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreenComponent from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TaskCreation from '../screens/TaskCreation';
import TaskDetails from '../screens/TaskDetailScreen';
import TaskListScreen from '../screens/TaskListScreen';
import DrawerNavigator from '../navigation/DrawerNavigator';

// Configure the navigation stack with screens and their options.

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    // Define the Splash screen configuration in the navigation stack.
    <Stack.Navigator initialRouteName="Splash"> 
      <Stack.Screen name="Splash" component={SplashScreenComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} /> 
      <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="TaskCreation" component={TaskCreation} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} options={{ headerShown: false }} />
      <Stack.Screen name="TaskLists" component={TaskListScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
