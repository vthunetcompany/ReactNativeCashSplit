import FlatListWithSpinner from "../../../../../shared/FlatListWithSpinner";
import styles from "./styles";
import { GlobalColors as GlobalColors } from "../../../../../shared/GlobalStyles";
import React, { useRef, useState } from "react";
import CustomView from "../../../../../shared/Components/CustomView";
import CustomText from "../../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import {
  capitalizeEachWord,
  convertPrice,
  getRandomInt,
  getRandomName,
  getUuidV4,
} from "../../../../../shared/Helpers";
import { CURRENCY } from "../../../../../shared/GlobalConstants";
import Icon from "../../../../../shared/Icon";
import { IconRoutes } from "../../../../../shared/Icon/IconRoutes";

const DashboardComponent = ({ props, modalProp }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = props;

  const {
    isShowExpenseModal,
    setIsShowExpenseModal,
    modalInfo,
    setModalInfo,

    isShowNameModal,
    setIsShowNameModal,
  } = modalProp

  const addPerson = () => {
    const clonedMasterData = Object.assign([], masterData)
    clonedMasterData.push({ id: getUuidV4(), name: getRandomName(), amount: 0, })

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
        onPress={() => {
          setModalInfo(item)
          setIsShowExpenseModal(true)
        }}
        onLongPress={() => {
          setModalInfo(item)
          setIsShowNameModal(true)
        }}
      >
        <CustomText style={styles.personRowNameText}>
          {capitalizeEachWord(item.name)}
        </CustomText>
        <CustomText bold style={styles.personRowAmountText}>
          {convertPrice(item.amount)}{CURRENCY}
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
        <Icon
          type={IconRoutes.Ionicon}
          name={'md-person-add'}
          size={18}
          style={{ color: GlobalColors.shadowColor, marginRight: 5 }}
        />
        <CustomText>Add more people</CustomText>
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
