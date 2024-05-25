// components/GlobalLayout.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// GlobalLayout is a component that wraps the common layout structure of the application, including header and footer.

const GlobalLayout = ({ children, navigation }) => {
  return (
    // Use SafeAreaView to ensure the content is displayed within the safe area boundaries of the device.
    <SafeAreaView style={styles.container}>
      {/* Header view with a menu button to toggle the navigation drawer and a title. */}
      <View style={styles.header}>
        {/* Button to toggle the drawer navigation, making it accessible from the header. */}
        <TouchableOpacity
          style={styles.drawerButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Plan-Pal</Text>
      </View>
      {children}

      {/* Footer section that displays the copyright statement of the application. */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Plan-Pal, Inc.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    height: 60,
  },
  drawerButton: {
    marginLeft: 10,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
  },
  footer: {
    height: 50,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default GlobalLayout;
