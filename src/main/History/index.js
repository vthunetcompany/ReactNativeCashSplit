import React from "react";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import HistoryHeader from "./HistoryHeader";
import HistoryScreen from "./HistoryScreen";

const History = ({navigation, dashboardProps}) => {

  return (
    <SafeAreaView style={{flex: 1,}}>
      <HistoryHeader
        navigation={navigation}
      />
      <HistoryScreen
        dashboardProps={dashboardProps}
      />
    </SafeAreaView>
  )
}

export default History
