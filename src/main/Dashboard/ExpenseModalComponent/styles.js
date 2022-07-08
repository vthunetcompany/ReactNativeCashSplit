import React, { useEffect, useState } from "react";
import CustomView from "../../../../shared/Components/CustomView";
import styles from "./index";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity } from "react-native";
import { GlobalColors } from "../../../../shared/GlobalStyles";
import Input from "../../../../shared/Input";
import { CURRENCY, MONEY_INCREMENT_LEVEL, THOUSAND_SEPARATOR } from "../../../../shared/GlobalConstants";
import { convertPrice, customReplaceAll, removeItemFromArray } from "../../../../shared/Helpers";

const modalInfoInitialState = {
  id: '',
  name: '',
  amount: ''
}

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
    listIndex,
    setListIndex,
  } = modalProp

  const [inputValue, setInputValue] = useState(0);
  const [showValue, setShowValue] = useState('')
  const [currentPersonInMasterData, setCurrentPersonInMasterData] = useState(modalInfoInitialState)

  const getRealValue = (v) => {
    return customReplaceAll(v, THOUSAND_SEPARATOR, '')
  }

  useEffect(() => {
    const clonedMasterData = Object.assign([], masterData)
    const currentPersonInMasterData = clonedMasterData.find(ele => ele.id === modalInfo.id)

    setCurrentPersonInMasterData(currentPersonInMasterData)
  }, [])

  useEffect(() => {
    setInputValue(parseInt(getRealValue(showValue)))
  }, [showValue])

  const addMoney = () => {
    // find user in masterData using id
    if (!!inputValue) {
      const priceAfterIncrement = inputValue * MONEY_INCREMENT_LEVEL
      const clonedMasterData = Object.assign([], masterData);
      removeItemFromArray(clonedMasterData, currentPersonInMasterData);
      clonedMasterData.push({
        id: modalInfo.id,
        amount: modalInfo.amount + priceAfterIncrement,
        name: modalInfo.name,
      });

      setMasterData(clonedMasterData.sort((a, b) => b.amount - a.amount));
    }
    setIsShowExpenseModal(false);
  }

  const subtractMoney = () => {
    if (!!inputValue) {
      const priceAfterIncrement = inputValue * MONEY_INCREMENT_LEVEL
      const clonedMasterData = Object.assign([], masterData);
      removeItemFromArray(clonedMasterData, currentPersonInMasterData);
      clonedMasterData.push({
        id: modalInfo.id,
        amount: priceAfterIncrement > modalInfo.amount ? 0 : modalInfo.amount - priceAfterIncrement,
        name: modalInfo.name,
      });

      setMasterData(clonedMasterData.sort((a, b) => b.amount - a.amount));
    }
    setIsShowExpenseModal(false);
  }

  return (
    <CustomView styles={styles.modalContainer}>

      <CustomView style={{ marginVertical: 10 }}>
        <Input
          value={showValue.toString()}
          onChangeText={(rawText) => {
            const text = customReplaceAll(rawText, THOUSAND_SEPARATOR, '');

            const handledValue =
              text.length > 0 && parseInt(text)
                ? parseInt(text).toString()
                : '0';
            const dottedTextValue = convertPrice(
              parseInt(handledValue)
            ).toString();

            setShowValue(handledValue && handledValue === '0' ? '' : dottedTextValue)
          }}
          onSubmitEditing={addMoney}
          keyboardType="number-pad"
          textAlign={"right"}
          placeholder={"0"}
          returnKeyType={"done"}
          icon={
            <CustomText bold style={{ marginRight: 5 }}>{THOUSAND_SEPARATOR}000{CURRENCY}</CustomText>
          }
          iconPosition="right"
          maxLength={6}
        />
      </CustomView>

      <CustomView style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={subtractMoney}
        >
          <CustomText bold color={GlobalColors.pure_red}>SUBTRACT</CustomText>
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
