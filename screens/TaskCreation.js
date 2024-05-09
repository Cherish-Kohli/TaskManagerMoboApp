import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Picker } from 'react-native';

const TaskCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');  // Default priority
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Pending');     // Default status

  const handleCreateTask = () => {
    // Validate input fields
    if (!title.trim() || !dueDate.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    
    // Here you might typically send this data back to your API/Server
    console.log('Task created:', { title, description, dueDate, priority, category, status });

    // Navigate back to the previous screen
    navigation.goBack();
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
      <TextInput
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
        style={styles.input}
        keyboardType="numeric"
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
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default TaskCreationScreen;
