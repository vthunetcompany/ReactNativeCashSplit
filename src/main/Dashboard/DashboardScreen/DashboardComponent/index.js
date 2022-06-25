import FlatListWithSpinner from "../../../../../shared/FlatListWithSpinner";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../../shared/GlobalStyles";
import React, { useRef, useState } from "react";
import CustomView from "../../../../../shared/Components/CustomView";
import CustomText from "../../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { capitalizeEachWord } from "../../../../../shared/Helpers";
import { CURRENCY } from "../../../../../shared/GlobalConstants";

const DashboardComponent = ({ props }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = props;

  const [count, setCount] = useState(0)

  const addPerson = name => {
    const clonedMasterData = Object.assign([], masterData)
    clonedMasterData.push({ name: 'hung', amount: count, })

    setCount(count => count + 1)
    setMasterData(clonedMasterData)
  }

  const removePerson = index => {
    const clonedMasterData = Object.assign([], masterData)
    clonedMasterData.splice(index, 1)

    setMasterData(clonedMasterData)
  }

  const personRenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.dashboardPersonRowContainer}
        onLongPress={() => {
          removePerson(index);
        }}
      >
        <CustomText style={styles.personRowNameText}>
          {capitalizeEachWord(item.name)}
        </CustomText>
        <CustomText bold style={styles.personRowAmountText}>
          {item.amount}{CURRENCY}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const personListRenderFooter = () => {
    return (
      <TouchableOpacity
        style={styles.dashBoardFooterContainer}
        onPress={addPerson}
      >
        <CustomText>+ Add more people</CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <CustomView style={styles.dashboardScreenScrollViewContainer}>
      <FlatListWithSpinner
        loading={isLoading}
        data={masterData}
        renderItem={personRenderItem}
        emptyText="Start adding people of your group"
        onRefresh={loadData}
        renderFooter={personListRenderFooter}
        bgColor={GlobalColors.background_color}
      />
    </CustomView>
  );
};

export default DashboardComponent;
