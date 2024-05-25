// SplashScreen.js
import React, { useEffect, useCallback, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevents the splash screen from auto-hiding to ensure it remains visible during initial app loading.
SplashScreen.preventAutoHideAsync();

function SplashScreenComponent({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      console.log("Preparation started");
      try {
        await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate a loading process
      } finally {
        console.log("Preparation done");
        setAppIsReady(true);
      }
    }
  
    prepare();
  }, []);
  
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      console.log("Splash screen hidden");
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000); // Delay the navigation by 3 seconds
    }
  }, [appIsReady, navigation]);
  
  
  // Return null if the app is not ready yet
  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default SplashScreenComponent;
