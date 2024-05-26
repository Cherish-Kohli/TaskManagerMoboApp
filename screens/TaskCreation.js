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
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars"; // Import Calendar component
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalStyles } from "../styles/globalStyles";

const TaskCreationScreen = ({ navigation }) => {
  // Initialize state variables for task details and modal visibility.

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium"); // Default priority
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Pending"); // Default status
  const [modalPriorityVisible, setModalPriorityVisible] = useState(false);
  const [modalStatusVisible, setModalStatusVisible] = useState(false);

  const globalStyles = useGlobalStyles();

  // Function to handle task creation, handles the creation of a task by validating fields and sending a POST request to the server.

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
        console.error("Error creating task:", error); // Catch and log any errors during the task creation process and display an error message to the user.
      });
  };

  // Render a scrollable form for task creation with input fields for task details and modals for priority and status selection.

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={globalStyles.text}>Create Task</Text>
      <TextInput
        placeholder="Title"
        // value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        placeholder="Description"
        // value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />

      {/* Utilize a calendar component to allow users to select a due date for the task. */}

      <Text style={styles.label}>Due Date:</Text>
      <Calendar
        onDayPress={(day) => setDueDate(day.dateString)}
        markedDates={{ [due_date]: { selected: true, selectedColor: "blue" } }}
      />

<Text style={styles.label}>Category:</Text>
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <Text style={styles.label}>Priority:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalPriorityVisible(true)}
      >
        <Text style={styles.textStyle}>{priority}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalPriorityVisible}
        onRequestClose={() => setModalPriorityVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {["High", "Medium", "Low"].map((p) => (
              <TouchableOpacity
                style={styles.option}
                key={p}
                onPress={() => {
                  setPriority(p);
                  setModalPriorityVisible(false);
                }}
              >
                <Text style={styles.textStyle}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Text style={styles.textStyle}>Status:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalStatusVisible(true)}
      >
        <Text style={styles.textStyle}>{status}</Text>
      </TouchableOpacity>

      {/* Render modals for selecting task priority and status, which are dynamically populated and controlled by modal visibility states. */}

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalStatusVisible}
        onRequestClose={() => setModalStatusVisible(false)}
      >
        <View style={styles.centeredView}>
        <View
          style={styles.modalView}
          onPress={() => setModalStatusVisible(false)}
        >
          {["Pending", "In Progress", "Completed"].map((s) => (
            <TouchableOpacity
              key={s}
              style={styles.option}
              onPress={() => {
                setStatus(s);
                setModalStatusVisible(false);
              }}
            >
              <Text style={styles.textStyle}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
        </View>
      </Modal>

      <Button title="Create Task" onPress={handleCreateTask} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "lightblue",
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
    backgroundColor: "white",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default TaskCreationScreen;
