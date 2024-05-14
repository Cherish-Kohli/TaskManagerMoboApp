import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableOpacity
} from "react-native";
import { Calendar } from "react-native-calendars"; // Import Calendar component
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(
        `http://192.168.1.106:3000/tasks/${taskId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseText = await response.text();
      try {
        const data = JSON.parse(responseText);
        setTask(data);
      } catch (error) {
        console.error("Failed to parse JSON:", responseText);
        console.error("Error fetching task details:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const updateTask = async () => {
    const token = await AsyncStorage.getItem("userToken");
    fetch(`http://192.168.1.106:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        status: task.status,
        due_date: task.due_date,
      }),
    })
      .then((res) => {
        if (res.ok) {
          Alert.alert("Success", "Task updated successfully");
        } else {
          Alert.alert("Error", "Task not found");
        }
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        Alert.alert("Error", "Failed to update task");
      });
  };

  const deleteTask = async (taskId) => {
    const token = await AsyncStorage.getItem("userToken");
    fetch(`http://192.168.1.106:3000/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert("Success", "Task deleted successfully");
          navigation.goBack();
        } else {
          Alert.alert("Error", "Task not found");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        Alert.alert("Error", "Failed to delete task");
      });
  };

  const selectPriority = (priority) => {
    setTask({ ...task, priority });
    setPriorityModalVisible(false);
  };

  const selectStatus = (status) => {
    setTask({ ...task, status });
    setStatusModalVisible(false);
  };

  if (!task) return <Text>Loading...</Text>;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={task.description}
        onChangeText={(text) => setTask({ ...task, description: text })}
        multiline
      />
      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={task.category}
        onChangeText={(text) => setTask({ ...task, category: text })}
      />
      <Text style={styles.label}>Priority:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPriorityModalVisible(true)}
      >
        <Text>{task.priority || "Select Priority"}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={priorityModalVisible}
        onRequestClose={() => {
          setPriorityModalVisible(!priorityModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {["High", "Medium", "Low"].map((priority, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => selectPriority(priority)}
              >
                <Text style={styles.textStyle}>{priority}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Status:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setStatusModalVisible(true)}
      >
        <Text>{task.status || "Select Status"}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => {
          setStatusModalVisible(!statusModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {["Pending", "In Progress", "Completed"].map((status, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => selectStatus(status)}
              >
                <Text style={styles.textStyle}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Text style={styles.label}>Due Date:</Text>
      <Calendar
        onDayPress={(day) => setTask({ ...task, due_date: day.dateString })}
        markedDates={{
          [task.due_date]: { selected: true, selectedColor: "blue" },
        }}
      />
      <Button title="Save" onPress={updateTask} color="#6200ee" />
      <Button
        title="Delete"
        onPress={() => deleteTask(task.id)}
        color="#d9534f"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "lightblue",
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "white",
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

export default TaskDetailScreen;
