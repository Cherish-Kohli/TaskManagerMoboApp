// SplashScreen.js
import React, { useEffect, useCallback, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

function SplashScreenComponent({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Prepare resources (e.g., fonts, images, API calls)
    async function prepare() {
      try {
        // Simulate any resource loading or initialization process
        await new Promise((resolve) => setTimeout(resolve, 4000));
      } finally {
        // Mark that the app is ready to show
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // This function will be called once the layout is fully visible
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen now that the app is ready
      await SplashScreen.hideAsync();
      // Navigate to the main screen
      navigation.replace('Login');
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
