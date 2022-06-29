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

  const getSection = (item, index) => {
    return (
      <CustomView style={styles.sectionViewContainer}>
        <CustomView style={styles.leftCol}>
          <CustomText>{masterData[index].name}</CustomText>
        </CustomView>
        <CustomView style={styles.rightCol}>
          <CustomText>{masterData[index].id}</CustomText>
        </CustomView>
      </CustomView>
    )
  }

  return (
    <ScrollView style={styles.resultScrollContainer}>
      <CustomView style={styles.resultViewContainer}>
        <CustomText>
          {
            debugPrint()
          }
        </CustomText>

        {masterData.map((i1, i2) => getSection(i1, i2))}
      </CustomView>
    </ScrollView>
  );
};

export default ResultScreen;
