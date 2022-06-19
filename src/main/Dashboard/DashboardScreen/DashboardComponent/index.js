import FlatListWithSpinner from "../../../../../shared/FlatListWithSpinner";
import styles from "../styles";
import { globalColors as GlobalColors } from "../../../../../shared/GlobalStyles";
import React from "react";
import CustomView from "../../../../../shared/Components/CustomView";
import CustomText from "../../../../../shared/Components/CustomText";

const DashboardComponent = ({ props }) => {
  const {
    isLoading,
    data,
  } = props;

  const personRenderItem = ({ item, index }) => {

  };

  const personListRenderFooter = () => {
    return (
      <CustomView>
        <CustomText>this is footer</CustomText>
      </CustomView>
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
