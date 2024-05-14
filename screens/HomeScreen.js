// screens/HomeScreen.js
import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import FloatingActionButton from '../components/FloatingButton';
import GlobalLayout from '../components/GlobalLayout';
import { useGlobalStyles } from '../styles/globalStyles'; 

function HomeScreen({ navigation }) {
  const globalStyles = useGlobalStyles();

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
      <ImageBackground
        source={{ uri: 'https://example.com/your-hero-image.jpg' }}
        style={globalStyles.container}
        resizeMode="cover"
      >
        <View style={globalStyles.overlay}>
          <Text style={globalStyles.text}>Welcome to Task Manager</Text>
          <Text style={[globalStyles.text, { marginVertical: 20 }]}>
            Organize your tasks efficiently and boost your productivity.
          </Text>
          <FloatingActionButton
            onPressCreate={navigateToCreateTask}
            onPressTaskList={navigateToTaskList}
            onPressTaskDetails={navigateToTaskDetails}
          />
          <Text style={[globalStyles.text, { marginTop: 20 }]}>
            "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible." — Francis of Assisi
          </Text>
        </View>
      </ImageBackground>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adds an overlay for text readability
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
