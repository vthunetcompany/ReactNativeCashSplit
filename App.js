import React from "react";
import { LogBox, StyleSheet, useColorScheme } from "react-native";
import { globalColors as GlobalColors } from "./shared/GlobalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "./src/storage/Routes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dashboard from "./src/main/Dashboard";
import Result from "./src/main/Result";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  LogBox.ignoreLogs([
    "Animated: `useNativeDriver`",
    "Warning: Each child in a list should have a unique \"key\" prop.",
    "Material Top Tab Navigator: 'tabBarOptions' is deprecated",
  ]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? GlobalColors.grey : GlobalColors.white,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeAreaViewContainer]}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              style: { display: "none" },
            }}
          >
            <Tab.Screen name={ROUTES.DASHBOARD_SCREEN}>
              {(props) =>
                <Dashboard {...props} />
              }
            </Tab.Screen>

            <Tab.Screen name={ROUTES.RESULT_SCREEN}>
              {(props) =>
                <Result {...props} />
              }
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  }
});

export default App;
