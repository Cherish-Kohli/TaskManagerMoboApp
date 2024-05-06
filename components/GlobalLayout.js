// components/GlobalLayout.js
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GlobalLayout = ({ children, navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Add a drawer button */}
        <TouchableOpacity style={styles.drawerButton} onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Plan-Pal</Text>
      </View>
      {children}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Plan-Pal, Inc.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    height: 60,
  },
  drawerButton: {
    marginLeft: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footer: {
    height: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default GlobalLayout;
