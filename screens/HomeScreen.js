// screens/HomeScreen.js

// Import necessary React components and custom components for the Home screen.

import React, { useState } from 'react';
import { View, Text, ImageBackground, Modal, Button, TouchableOpacity, StyleSheet } from 'react-native';
import FloatingActionButton from '../components/FloatingButton';
import GlobalLayout from '../components/GlobalLayout';
import { useGlobalStyles } from '../styles/globalStyles';



// Defining the HomeScreen component with navigation props for routing.

function HomeScreen({ navigation }) {

  // State for managing visibility of modals for different informational sections.

  const [modalVisible, setModalVisible] = useState({ manage: false, organize: false, achieve: false });
  const globalStyles = useGlobalStyles();

  const toggleModal = (type) => {
    setModalVisible(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <GlobalLayout navigation={navigation}>
      <ImageBackground 
        source={require('../assets/hero_image.png')} 
        style={globalStyles.container}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={globalStyles.text}>Welcome to Task Manager</Text>
          

          {/* Toggles the visibility of modals based on the type ('manage', 'organize', 'achieve'). */}

          <Button title="Manage Tasks" onPress={() => toggleModal('manage')} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.manage}
            onRequestClose={() => toggleModal('manage')}
          >
            {/* Button to open modal with details on managing tasks. Modal includes a close button. */}

            <View style={styles.modalView}>
              <Text>Create, manage, and complete your tasks.</Text>
              <TouchableOpacity onPress={() => toggleModal('manage')} style={styles.button}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          
          {/* Button to open modal with tips on staying organized. Modal can be closed with a touchable opacity. */}

          <Button title="Stay Organized" onPress={() => toggleModal('organize')} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.organize}
            onRequestClose={() => toggleModal('organize')}
          >
            <View style={styles.modalView}>
              <Text>Organize your tasks by categories and priorities.</Text>
              <TouchableOpacity onPress={() => toggleModal('organize')} style={styles.button}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>


          {/* Button to reveal modal focused on goal setting and progress tracking. */}

          <Button title="Achieve Goals" onPress={() => toggleModal('achieve')} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.achieve}
            onRequestClose={() => toggleModal('achieve')}
          >
            <View style={styles.modalView}>
              <Text>Set goals and track your progress.</Text>
              <TouchableOpacity onPress={() => toggleModal('achieve')} style={styles.button}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* Floating action button with navigation options to create tasks, view task list, and access task details. */}

          <FloatingActionButton
            onPressCreate={() => navigation.navigate('TaskCreation')}
            onPressTaskList={() => navigation.navigate('TaskList')}
            onPressTaskDetails={() => navigation.navigate('TaskDetails')}
          />
        </View>
      </ImageBackground>
    </GlobalLayout>
  );
}


// StyleSheet for styling Home screen components, including modals and buttons.


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    marginTop: 15,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  }
});

export default HomeScreen;
