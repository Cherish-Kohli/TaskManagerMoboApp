// styles/globalStyles.js
import { StyleSheet } from "react-native";
import { useSettings } from "../context/SettingsContext"; // Adjust the path as necessary

export const useGlobalStyles = () => {
  const { settings } = useSettings();

  const styles = StyleSheet.create({
    text: {
      fontSize: settings.fontSize === 'large' ? 24 : settings.fontSize === 'medium' ? 18 : 14,
      color: settings.backgroundColor === '#000' ? '#fff' : '#000',
    },
    container: {
      flex: 1,
      backgroundColor: settings.backgroundColor, // Same for the container
    }
  });

  return styles;
};
