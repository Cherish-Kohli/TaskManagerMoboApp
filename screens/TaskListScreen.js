// Import necessary libraries and components for task list management.

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// Define the TaskListScreen component with navigation props for routing.

const TaskListScreen = ({ navigation }) => {
  // State to store the list of tasks fetched from the server.

  const [tasks, setTasks] = useState([]);
// Fetch tasks from the server whenever this screen is focused.

  useFocusEffect(
    React.useCallback(() => {
      // Function to fetch tasks from the server using AsyncStorage for secure token storage.

      const fetchTasks = async () => {
        const token = await AsyncStorage.getItem('userToken');
        fetch('http://192.168.1.106:3000/tasks', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            // Handle HTTP errors
            throw new Error('Failed to fetch tasks.');
          }
        })

        // Handle HTTP errors and empty data scenarios with alerts.

        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            console.log('Data fetched:', data);
            setTasks(data);
          } else {
            // No tasks found
            Alert.alert("Notice", "No tasks available.");
          }
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
          Alert.alert("Error", "Unable to load tasks. Please try again later.");
        });
      };
      
      fetchTasks();
    }, [])
  );

  // Function to delete a task based on its ID and update the state.
  const deleteTask = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    fetch(`http://192.168.1.106:3000/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(res.ok) {
        setTasks(tasks.filter(task => task.id !== id));
        Alert.alert("Success", "Task deleted successfully");
      } else {
        Alert.alert("Error", "Failed to delete task");
      }
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      Alert.alert("Error", "Failed to delete task");
    });
  };

  // Render a flat list of tasks with delete and detail buttons.

  return (
    <View style={styles.container}>
       {/* Display the list of tasks using a FlatList for efficient rendering. */}

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.taskDetails}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => deleteTask(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}>
                <Text style={styles.buttonText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

// StyleSheet definitions for the TaskListScreen layout and components.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  taskDetails: {
    flex: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});

export default TaskListScreen;
