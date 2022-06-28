import React from "react";
import { ScrollView } from "react-native";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import CustomView from "../../../../shared/Components/CustomView";

const ResultScreen = ({
                        dashboardProps,
                      }) => {

  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = dashboardProps;

  const debugPrint = () => {
    return masterData.reduce((prev, curr) => prev + curr.id.concat('\n'), '')
  }

  return (
    <ScrollView style={styles.resultScrollContainer}>
      <CustomView style={styles.resultViewContainer}>
        <CustomText>
          {
            debugPrint()
          }
        </CustomText>
      </CustomView>
    </ScrollView>
  );
};

export default ResultScreen;
