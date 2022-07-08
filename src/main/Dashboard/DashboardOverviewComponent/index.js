import CustomView from "../../../../shared/Components/CustomView";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { CURRENCY, CURRENCY_CODE, MONEY_INCREMENT_LEVEL } from "../../../../shared/GlobalConstants";
import { convertPrice, isEmpty } from "../../../../shared/Helpers";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";
import { GlobalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const DashboardOverviewComponent = ({ props }) => {
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

  const getAvg = () => isEmpty(masterData) ? 0 : Math.ceil((totalSpending / masterData.length) / MONEY_INCREMENT_LEVEL) * MONEY_INCREMENT_LEVEL ?? 0

  const getHeadcountIcons = () => {
    if (isEmpty(masterData)) {
      return (
        <Icon
          type={IconRoutes.MaterialCommunityIcons}
          name={"sleep"}
          size={20}
          style={{ color: GlobalColors.darkPink1 }}
        />
      );
    } else
      return masterData.map((item, index) => {
        return (
          <Icon
            type={IconRoutes.Ionicon}
            name={"person"}
            size={20}
            style={{ color: GlobalColors.pink2, marginRight: 1 }}
          />
        );
      });
  };

  return (
    <CustomView style={styles.dashboardOverviewContainer}>
      <TouchableOpacity style={styles.clockContainer}>
        <CustomText bold style={{ marginBottom: 5 }}>
          Total
        </CustomText>

        <CustomText bold large style={styles.clockText}>
          {convertPrice(totalSpending)}{CURRENCY}
        </CustomText>

        <CustomText bold style={{ marginTop: 5 }}>
          {CURRENCY_CODE}
        </CustomText>
      </TouchableOpacity>

      <CustomView style={styles.overviewInfoContainer}>
        <CustomText bold large>Headcount: {masterData.length}</CustomText>

        <CustomView style={{ flexDirection: "row", marginTop: 2 }}>
          {getHeadcountIcons()}
        </CustomView>

        <CustomText bold large style={styles.averageText}>
          {`Average 💸\n${convertPrice(getAvg())}${CURRENCY}`}
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default DashboardOverviewComponent;
