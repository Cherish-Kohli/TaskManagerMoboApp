import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const GlobalLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
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
    backgroundColor: '#f0f0f0'
  },
  header: {
    height: 60,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  footer: {
    height: 50,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16
  }
});

export default GlobalLayout;
