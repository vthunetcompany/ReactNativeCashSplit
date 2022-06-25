import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet, useColorScheme } from "react-native";
import { globalColors as GlobalColors } from "./shared/GlobalStyles";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "./src/storage/Routes";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Dashboard from "./src/main/Dashboard";
import Result from "./src/main/Result";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useToggle } from "./shared/hooks/useToggle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "./src/storage/AsyncStorageKeys";
import { DEBUG_MODE, USE_SAMPLE_DATA } from "./shared/GlobalConstants";

const Tab = createMaterialTopTabNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === "dark";
  LogBox.ignoreLogs([
    "Animated: `useNativeDriver`",
    "Warning: Each child in a list should have a unique \"key\" prop.",
    "Material Top Tab Navigator: 'tabBarOptions' is deprecated",
    "Sending `onAnimatedValueUpdate` with no listeners registered.",
  ]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? GlobalColors.grey : GlobalColors.white,
  };

  // start configuring masterData
  const [isLoading, toggleLoading] = useToggle(true);
  const [masterData, setMasterData] = useState([]);

  const loadData = async () => {
    return JSON.parse(await AsyncStorage.getItem(AsyncStorageKeys.masterData));
  };

  const saveData = masterData => {
    AsyncStorage.setItem(AsyncStorageKeys.masterData, JSON.stringify(masterData));
  };

  useEffect(() => {
    // set timer loading UI
    if (!DEBUG_MODE) {
      setTimeout(() => {
        toggleLoading(false);
      }, 1000);
    }

    if (USE_SAMPLE_DATA) {
      const setData = () => {
        const sampleData = [
          // { name: "hung vu", amount: 69000 },
          // { name: "alice", amount: 25000 },
          // { name: "xi peso", amount: 1200000 },
          // { name: "johnny walker", amount: 1200000 },
          // { name: "moon peso", amount: 1200000 },
          // { name: "john doe", amount: 1200000 },
          // { name: "vu hung", amount: 1200000 },
          // { name: "george bush", amount: 1200000 },
          // { name: "the queen of england", amount: 1200000 },
        ];

        saveData(sampleData);
      };
      setData();
    }

    // load masterData from local storage on startup
    loadData().then(res => {
      console.log("Startup::", res);
      if (!!res) {
        setMasterData(res);
      }
      toggleLoading(false)
    });
  }, []);

  useEffect(() => {
    if (!!masterData) {
      console.log("masterData changes::", masterData);
      setMasterData(masterData.sort((a, b) => b.amount - a.amount))
      saveData(masterData);
    }
  }, [masterData]);

  const dashboardProps = {
    isLoading,
    masterData,
    setMasterData,
    loadData,
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
                <Dashboard {...props} dashboardProps={dashboardProps}/>
              }
            </Tab.Screen>

            <Tab.Screen name={ROUTES.RESULT_SCREEN}>
              {(props) =>
                <Result {...props} dashboardProps={dashboardProps} />
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
