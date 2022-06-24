import FlatListWithSpinner from "../../../../../shared/FlatListWithSpinner";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../../shared/GlobalStyles";
import React from "react";
import CustomView from "../../../../../shared/Components/CustomView";
import CustomText from "../../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";

const DashboardComponent = ({ props }) => {
  const {
    isLoading,
    data,
  } = props;

  const personRenderItem = ({ item, index }) => {
    <TouchableOpacity style={styles.dashboardFooterContainer}>
      <CustomText>+ Add more people</CustomText>
    </TouchableOpacity>
  };

  const personListRenderFooter = () => {
    return (
      <TouchableOpacity style={styles.dashboardFooterContainer}>
        <CustomText>+ Add more people</CustomText>
      </TouchableOpacity>
    )
  };

  return (
    <CustomView style={styles.dashboardScreenScrollViewContainer}>
      <FlatListWithSpinner
        loading={isLoading}
        data={data}
        renderItem={personRenderItem}
        emptyText="Start adding people of your group"

        renderFooter={personListRenderFooter}
        bgColor={GlobalColors.background_color}
      />
    </CustomView>
  );
};

export default DashboardComponent;
