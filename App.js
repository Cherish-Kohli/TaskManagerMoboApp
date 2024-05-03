import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';
import GlobalLayout from './components/GlobalLayout';  // Correct for default export



export default function App() {
  return (
    <NavigationContainer>
      <GlobalLayout>
        <AppNavigator />
      </GlobalLayout>
    </NavigationContainer>
  );
}
