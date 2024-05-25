// Import React and necessary components from React Native and context.

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext'; 
import { useGlobalStyles } from '../styles/globalStyles'; 

// Define the SettingsScreen component for managing app settings.

function SettingsScreen() {

  // Retrieve settings context for managing app settings and global styles for styling.

  const { settings, saveSettings } = useSettings();
  const globalStyles = useGlobalStyles();

  // Display current settings and provide buttons to update font size and background color.
  return (
    <View style={globalStyles.container}
    contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={globalStyles.text}>Current Font Size: {settings.fontSize}</Text>

       {/* Buttons to change the font size setting. */}

      <Button title="Set Large Font" onPress={() => saveSettings({ fontSize: 'large' })} />
      <Button title="Set Medium Font" onPress={() => saveSettings({ fontSize: 'medium' })} />
      <Button title="Set Small Font" onPress={() => saveSettings({ fontSize: 'small' })} />

      <Text style={globalStyles.text}>Current Background Color: {settings.backgroundColor}</Text>

      {/* Buttons to change the background color setting. */}

      <Button title="Set Light Background" onPress={() => saveSettings({ backgroundColor: '#fff' })} />
      <Button title="Set Dark Background" onPress={() => saveSettings({ backgroundColor: '#000' })} />
    </View>
  );
}

// StyleSheet for layout and styling of the settings screen.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default SettingsScreen;
