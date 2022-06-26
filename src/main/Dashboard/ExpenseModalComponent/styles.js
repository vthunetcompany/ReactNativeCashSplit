import React, { useState } from "react";
import CustomView from "../../../../shared/Components/CustomView";
import styles from "./index";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { GlobalColors } from "../../../../shared/GlobalStyles";
import Input from "../../../../shared/Input";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";
import { CURRENCY } from "../../../../shared/GlobalConstants";

const ExpenseModalComponent = ({
                                 modalProp,
                                 masterDataProp,
                               }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = masterDataProp;

  const {
    isShowExpenseModal,
    setIsShowExpenseModal,
    modalInfo,
    setModalInfo,
  } = modalProp

  const [inputValue, setInputValue] = useState("");

  const addMoney = () => {

    setIsShowExpenseModal(false)
  }

  const subtractMoney = () => {

    setIsShowExpenseModal(false)
  }

  return (
    <CustomView styles={styles.modalContainer}>

      <CustomView style={{ marginVertical: 10 }}>
        <Input
          value={inputValue}
          onChangeText={(value) => {
            setInputValue(value)
          }}
          onSubmitEditing={addMoney}
          keyboardType="number-pad"
          placeholder={"0"}
          returnKeyType={"done"}
          icon={
            <CustomText bold style={{marginRight: 5,}}>{CURRENCY}</CustomText>
          }
          iconPosition="right"
        />
      </CustomView>

      <CustomView style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={subtractMoney}
        >
          <CustomText bold color={GlobalColors.white}>SUBTRACT</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rightButton}
          onPress={addMoney}
        >
          <CustomText bold color={GlobalColors.white}>ADD</CustomText>
        </TouchableOpacity>
      </CustomView>
    </CustomView>
  );
};

export default ExpenseModalComponent;
