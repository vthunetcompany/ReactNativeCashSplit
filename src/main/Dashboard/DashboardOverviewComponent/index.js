import CustomView from "../../../../shared/Components/CustomView";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { CURRENCY } from "../../../../shared/GlobalConstants";
import { convertPrice } from "../../../../shared/Helpers";

const DashboardOverviewComponent = ({props}) => {
  const [totalSpending, setTotalSpending] = useState(0);
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = props;

  useEffect(() => {
    setTotalSpending(calculateTotalSpending());
  }, [masterData]);

  const calculateTotalSpending = () => {
    if (masterData.isEmpty) return 0;
    if (masterData.length === 1) return masterData[0].amount;
    return masterData.reduce((prev, curr) => prev + curr.amount, 0);
  };

  return (
    <CustomView style={styles.dashboardOverviewContainer}>
      <TouchableOpacity style={styles.clockContainer}>

        <CustomText bold large style={styles.clockText}>
          {convertPrice(totalSpending * 1000000)}{CURRENCY}
        </CustomText>

      </TouchableOpacity>
    </CustomView>
  );
};

export default DashboardOverviewComponent;
