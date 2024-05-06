// Import React and necessary components from React Native
import React from 'react';
import { View, Text, Button } from 'react-native';

// Define a functional component for each screen
const TaskDetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.header}>
        <DrawerButton navigation={navigation} />
        <Text style={styles.headerText}>Task Details</Text>
      </View>
      <Text>Example Screen</Text>
      
      <Button
        title="Go to Next Screen"
        onPress={() => navigation.navigate('NextScreenName')}
      />
    </View>
  );
};

// Make sure to export the component
export default TaskDetailScreen;