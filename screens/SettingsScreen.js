import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';  // Make sure the path is correct
import { useGlobalStyles } from '../styles/globalStyles'; 


function SettingsScreen() {
  const { settings, saveSettings } = useSettings();
  const globalStyles = useGlobalStyles();
  return (
    <View style={globalStyles.container}
    contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={globalStyles.text}>Current Font Size: {settings.fontSize}</Text>
      <Button title="Set Large Font" onPress={() => saveSettings({ fontSize: 'large' })} />
      <Button title="Set Medium Font" onPress={() => saveSettings({ fontSize: 'medium' })} />
      <Button title="Set Small Font" onPress={() => saveSettings({ fontSize: 'small' })} />

      <Text style={globalStyles.text}>Current Background Color: {settings.backgroundColor}</Text>
      <Button title="Set Light Background" onPress={() => saveSettings({ backgroundColor: '#fff' })} />
      <Button title="Set Dark Background" onPress={() => saveSettings({ backgroundColor: '#000' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});

export default SettingsScreen;
