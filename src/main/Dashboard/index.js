import DashboardHeader from "./DashboardHeader";
import DashboardScreen from "./DashboardScreen";
import React from "react";
import CustomView from "../../../shared/Components/CustomView";
import { SafeAreaView } from "react-native";

const Dashboard = ({ navigation }) => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <DashboardHeader navigation={navigation} />
      <DashboardScreen />
    </SafeAreaView>
  );
};

export default Dashboard;
