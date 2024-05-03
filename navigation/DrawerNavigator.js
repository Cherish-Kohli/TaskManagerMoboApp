import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import TaskListScreen  from '../screens/TaskListScreen';  // Ensure you have this screen or replace it with another
import SettingsScreen from '../screens/SettingsScreen';  // Ensure you have this screen or replace it with another

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Tasks" component={TaskListScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
