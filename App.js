import React from "react";
import { LogBox, SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { globalColors as GlobalColors } from "./shared/GlobalStyles";
import DashboardScreen from "./src/main/Dashboard/DashboardScreen";
import DashboardHeader from "./src/main/Dashboard/DashboardHeader";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? GlobalColors.grey : GlobalColors.white,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeAreaViewContainer]}>
      <DashboardHeader/>
      <DashboardScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  }
});

export default App;
