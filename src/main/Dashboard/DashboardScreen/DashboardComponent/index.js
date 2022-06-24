import FlatListWithSpinner from "../../../../../shared/FlatListWithSpinner";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../../shared/GlobalStyles";
import React from "react";
import CustomView from "../../../../../shared/Components/CustomView";
import CustomText from "../../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { capitalizeEachWord } from "../../../../../shared/Helpers";
import { CURRENCY } from "../../../../../shared/GlobalConstants";
import Swipeable from "react-native-swipeable";

const DashboardComponent = ({ props }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
  } = props;

  const personRenderItem = ({ item, index }) => {
    return (
      <Swipeable
        leftContent={<CustomText bold>hehe</CustomText>}
        onLeftActionRelease={() => {
          let masterDataCopy = masterData
          masterDataCopy.pop(index)

          setMasterData(masterDataCopy);
        }}
        leftActionActivationDistance={20}
      >
        <TouchableOpacity style={styles.dashboardPersonRowContainer}>
          <CustomText style={styles.personRowNameText}>
            {capitalizeEachWord(item.name)}
          </CustomText>
          <CustomText bold style={styles.personRowAmountText}>
            {item.amount}{CURRENCY}
          </CustomText>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  const personListRenderFooter = () => {
    return (
      <TouchableOpacity style={styles.dashBoardFooterContainer}>
        <CustomText>+ Add more people</CustomText>
      </TouchableOpacity>
    )
  };

  return (
    <CustomView style={styles.dashboardScreenScrollViewContainer}>
      <FlatListWithSpinner
        loading={isLoading}
        data={masterData}
        renderItem={personRenderItem}
        emptyText="Start adding people of your group"

        renderFooter={personListRenderFooter}
        bgColor={GlobalColors.background_color}
      />
    </CustomView>
  );
};

export default DashboardComponent;
