import CustomView from "../../../../shared/Components/CustomView";
import React, { useEffect } from "react";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { CURRENCY } from "../../../../shared/GlobalConstants";

const DashboardOverviewComponent = ({props}) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = props;

  useEffect(() => {

  }, [])

  return (
    <CustomView style={styles.dashboardOverviewContainer}>
      <TouchableOpacity style={styles.clockContainer}>

        <CustomText bold large style={styles.clockText}>
          {CURRENCY}
        </CustomText>

      </TouchableOpacity>
    </CustomView>
  );
};

export default DashboardOverviewComponent;
