import DashboardHeader from "./DashboardHeader";
import DashboardScreen from "./DashboardScreen";
import React from "react";
import { SafeAreaView } from "react-native";

const Dashboard = ({ navigation, masterDataProps }) => {

  return (
    <SafeAreaView style={{flex: 1}}>
      <DashboardHeader navigation={navigation} />
      <DashboardScreen dashboardProps={masterDataProps}/>
    </SafeAreaView>
  );
};

export default Dashboard;
