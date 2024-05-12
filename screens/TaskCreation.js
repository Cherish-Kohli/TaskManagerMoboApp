import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Import Calendar component
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TaskCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');  // Default priority
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Pending');     // Default status

  // Function to handle task creation
  const handleCreateTask = async () => {
    if (!title.trim() || !dueDate.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      console.error('No token found');
      // Handle logged out scenario or token expiration
      return;
    }

    fetch('http:/172.20.10.2:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title, description, dueDate, priority, category, status
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Task created successfully:', data);
      navigation.goBack();
    })
    .catch(error => {
      console.error('Error creating task:', error);
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Task</Text>
      </View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      {/* Calendar component */}
      <Calendar
        onDayPress={(day) => setDueDate(day.dateString)} // Capture selected date
        markedDates={{ [dueDate]: { selected: true, selectedColor: 'blue' } }} // Highlight selected date
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />
      <Picker
        selectedValue={priority}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
        <Picker.Item label="High" value="High" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="Low" value="Low" />
      </Picker>
      <Picker
        selectedValue={status}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>
      <Button title="Create Task" onPress={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default TaskCreationScreen;
