// Import React and necessary components from React Native
import React from 'react';
import { View, Text, Button } from 'react-native';

// Define a functional component for each screen
const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Example Screen</Text>
      // Optionally add navigation buttons if needed
      <Button
        title="Go to Next Screen"
        onPress={() => navigation.navigate('NextScreenName')}
      />
    </View>
  );
};

// Make sure to export the component
export default SettingsScreen;