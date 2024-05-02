import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function GlobalLayout({ children, navigation, currentScreen, onNavigate, userSettings }) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: userSettings.themeColor }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate('Home')}>
          <MaterialIcons name="home" size={24} color={currentScreen === 'Home' ? '#FFD700' : '#FFFFFF'} />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Task Manager</Text>
        <TouchableOpacity onPress={() => onNavigate('Settings')}>
          <MaterialIcons name="settings" size={24} color={currentScreen === 'Settings' ? '#FFD700' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {children}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => onNavigate('Calendar')}>
          <MaterialIcons name="calendar-today" size={24} color={currentScreen === 'Calendar' ? '#FFD700' : '#FFFFFF'} />
          <Text style={styles.iconText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate('Tasks')}>
          <MaterialIcons name="list" size={24} color={currentScreen === 'Tasks' ? '#FFD700' : '#FFFFFF'} />
          <Text style={styles.iconText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate('About')}>
          <MaterialIcons name="info" size={24} color={currentScreen === 'About' ? '#FFD700' : '#FFFFFF'} />
          <Text style={styles.iconText}>About</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

GlobalLayout.defaultProps = {
  userSettings: {
    themeColor: '#4A90E2' // Default theme color
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4A90E2',
  },
  headerText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#4A90E2',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});
