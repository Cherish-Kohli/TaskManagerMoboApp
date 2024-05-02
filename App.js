import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import AboutScreen from './screens/AboutScreen';
import { GlobalLayout } from './components/GlobalLayout'; // Ensure this path is correct

const Stack = createNativeStackNavigator();

function App() {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const handleNavigate = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {['Splash', 'Login', 'Tasks', 'TaskDetails', 'Settings', 'About'].map((screen) => (
          <Stack.Screen
            key={screen}
            name={screen}
            options={{ headerShown: false }} // Hide the default header
            >
            {props => (
              <GlobalLayout
                {...props}
                currentScreen={currentScreen}
                onNavigate={handleNavigate}
              >
                {React.createElement({
                  Splash: SplashScreen,
                  Login: LoginScreen,
                  Tasks: TaskListScreen,
                  TaskDetails: TaskDetailScreen,
                  Settings: SettingsScreen,
                  About: AboutScreen,
                }[screen], props)}
              </GlobalLayout>
            )}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
