import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const token = await AsyncStorage.getItem('userToken');
      fetch(`http://172.20.10.2:3000/tasks/${taskId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => setTask(data))
      .catch(error => console.error('Error fetching task details:', error));
    };
    
    fetchTask();
  }, [taskId]);

  const updateTask = async () => {
    const token = await AsyncStorage.getItem('userToken');
    fetch(`http://172.20.10.2:3000/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        status: task.status,
        due_date: task.dueDate
      })
    })
    .then(res => {
      if (res.ok) {
        Alert.alert("Success", "Task updated successfully");
      } else {
        Alert.alert("Error", "Task not found");
      }
    })
    .catch(error => {
      console.error('Error updating task:', error);
      Alert.alert("Error", "Failed to update task");
    });
  };
  

  const deleteTask = async (taskId) => {
    const token = await AsyncStorage.getItem('userToken');
    fetch(`http://172.20.10.2:3000/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        Alert.alert("Success", "Task deleted successfully");
        navigation.goBack(); // Navigate back only if in details screen
      } else {
        Alert.alert("Error", "Task not found");
      }
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      Alert.alert("Error", "Failed to delete task");
    });
  };
  
  if (!task) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text>Title:</Text>
      <TextInput value={task.title} onChangeText={(text) => setTask({ ...task, title: text })} />
      <Button title="Save" onPress={updateTask} />
      <Button title="Delete" onPress={deleteTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'lightblue' // Temporary background color to check visibility
  }
});

export default TaskDetailScreen;
