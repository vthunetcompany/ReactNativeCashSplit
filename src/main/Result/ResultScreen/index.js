import React from "react";
import { ScrollView } from "react-native";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import CustomView from "../../../../shared/Components/CustomView";
import { getUuidV4 } from "../../../../shared/Helpers";

const ResultScreen = ({
                        dashboardProps,
                      }) => {

  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = dashboardProps;

  console.log('guid', getUuidV4());
  const heeh = () => {
    let i, str = ''
    for (i = 0; i < 60; i++) {
      str += getUuidV4() + '\n'
    }
    return str
  }

  return (
    <ScrollView style={styles.resultScrollContainer}>
      <CustomView style={styles.resultViewContainer}>
        <CustomText>
          {
            heeh()
          }
        </CustomText>
      </CustomView>
    </ScrollView>
  );
};

export default ResultScreen;
