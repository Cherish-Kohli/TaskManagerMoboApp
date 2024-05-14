import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity
} from "react-native";
import { Calendar } from "react-native-calendars"; // Import Calendar component
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalStyles } from '../styles/globalStyles'; 

const TaskCreationScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium"); // Default priority
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [modalPriorityVisible, setModalPriorityVisible] = useState(false);
  const [modalStatusVisible, setModalStatusVisible] = useState(false);

  const globalStyles = useGlobalStyles();
  
  // Function to handle task creation
  const handleCreateTask = async () => {
    if (!title.trim() || !due_date.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.error("No token found");
      // Handle logged out scenario or token expiration
      return;
    }

    fetch("http:/192.168.1.106:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        due_date,
        priority,
        category,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task created successfully:", data);
        Alert.alert("Success", "Task created successfully"); // Show the success alert
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  return (
    <ScrollView
    style={globalStyles.container}
    contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={globalStyles.text}>Create Task</Text>
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
      <Calendar
        onDayPress={(day) => setDueDate(day.dateString)}
        markedDates={{ [due_date]: { selected: true, selectedColor: "blue" } }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TouchableOpacity style={styles.input} onPress={() => setModalPriorityVisible(true)}>
        <Text style={globalStyles.text}>{priority}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalPriorityVisible}
        onRequestClose={() => setModalPriorityVisible(false)}
      >
        <TouchableOpacity style={styles.modalView} onPress={() => setModalPriorityVisible(false)}>
          {["High", "Medium", "Low"].map((p) => (
            <TouchableOpacity key={p} style={styles.modalItem} onPress={() => {
              setPriority(p);
              setModalPriorityVisible(false);
            }}>
              <Text style={globalStyles.text}>{p}</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={styles.input} onPress={() => setModalStatusVisible(true)}>
        <Text style={globalStyles.text}>{status}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalStatusVisible}
        onRequestClose={() => setModalStatusVisible(false)}
      >
        <TouchableOpacity style={styles.modalView} onPress={() => setModalStatusVisible(false)}>
          {["Pending", "In Progress", "Completed"].map((s) => (
            <TouchableOpacity key={s} style={styles.modalItem} onPress={() => {
              setStatus(s);
              setModalStatusVisible(false);
            }}>
              <Text style={globalStyles.text}>{s}</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </Modal>

      <Button title="Create Task" onPress={handleCreateTask} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center'
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalItem: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 10,
    width: 200,
    alignItems: 'center'
  }
});

export default TaskCreationScreen;