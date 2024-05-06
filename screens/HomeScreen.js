// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FloatingActionButton from '../components/FloatingButton';
import GlobalLayout from '../components/GlobalLayout';

function HomeScreen({ navigation }) {
  const navigateToCreateTask = () => {
    navigation.navigate('TaskCreation');
  };

  const navigateToTaskList = () => {
    navigation.navigate('TaskList');
  };

  const navigateToTaskDetails = () => {
    navigation.navigate('TaskDetails');
  };

  return (
    <GlobalLayout navigation={navigation}>
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <FloatingActionButton
          onPressCreate={navigateToCreateTask}
          onPressTaskList={navigateToTaskList}
          onPressTaskDetails={navigateToTaskDetails}
        />
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
