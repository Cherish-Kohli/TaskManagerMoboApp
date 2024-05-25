// navigation/DrawerNavigator.js

// Import React and navigation components, along with screen components used in the navigator.

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import TaskListScreen from '../screens/TaskListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TaskCreation from '../screens/TaskCreation';


// Setup the drawer navigation for the app, defining navigation routes and initial route.

const Drawer = createDrawerNavigator();

// Define each screen in the drawer, setting up the navigation path and associated screen component.

function DrawerNavigator() {
  return (
    // Setup the Home screen as the initial route with no header.

    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="TaskList" component={TaskListScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="TaskCreation" component={TaskCreation} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
