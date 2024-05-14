// screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import licenses from '../licenses.json';
import { useGlobalStyles } from '../styles/globalStyles'; 

function AboutScreen() {
  const globalStyles = useGlobalStyles();
  return (
    <ScrollView style={globalStyles.container}
    contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={styles.headerText}>About TaskManagerApp</Text>
      <Text style={globalStyles.text}>
        TaskManagerApp is designed to help individuals manage their daily tasks effectively.
        It leverages modern technology to ensure seamless task management.
      </Text>
      <Text style={styles.headerText}>Open Source Licenses</Text>
      {Object.entries(licenses).map(([key, value]) => (
        <View key={key} style={styles.licenseItem}>
          <Text style={globalStyles.text}>{`${key.split('@')[0]} - License: ${value.licenses}`}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(value.licenseUrl)}>
            <Text style={globalStyles.text}>View License</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  licenseItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  licenseText: {
    fontSize: 16,
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 5,
  }
});

export default AboutScreen;