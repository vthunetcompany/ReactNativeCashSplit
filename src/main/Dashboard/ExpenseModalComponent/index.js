import React, {useEffect, useRef, useState} from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import CustomText from '../../../../shared/Components/CustomText';
import {TouchableOpacity} from 'react-native';
import {GlobalColors} from '../../../../shared/GlobalStyles';
import Input from '../../../../shared/Input';
import {
  CURRENCY,
  MONEY_INCREMENT_LEVEL,
  THOUSAND_SEPARATOR,
  TRANSACTION_TYPE,
} from '../../../../shared/GlobalConstants';
import {
  convertPrice,
  customReplaceAll,
  getPrintableDateTime,
  getPrintableUnit,
  getUuidV4,
  removeItemFromArray
} from '../../../../shared/Helpers';
import CommonPickerContent from "../../../../shared/Components/CommonPickerContent";
import {Categories, CategoriesObj, CategoryOther} from "../../../storage/Catogories";
import {FeatureFlags} from "../../../FeatureFlags";

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
    spendingHistory,
    setSpendingHistory,
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
  const [showValue, setShowValue] = useState('');
  const [note, setNote] = useState('');
  const [currentPersonInMasterData, setCurrentPersonInMasterData] = useState(modalInfoInitialState);
  const [category, setCategory] = useState(
    Categories.find(category => category.value.includes('Food')) ?? Categories[Math.floor(Categories.length / 2)]
  );
  const refInput = useRef(null);

  useEffect(() => {
    const clonedMasterData = Object.assign([], masterData);
    const currentPersonInMasterData = clonedMasterData.find(ele => ele.id === modalInfo.id);

    setCurrentPersonInMasterData(currentPersonInMasterData);
  }, []);

  const getRealValue = (v) => {
    return customReplaceAll(v, THOUSAND_SEPARATOR, '');
  };

  useEffect(() => {
    setInputValue(parseInt(getRealValue(showValue)))
  }, [showValue])

  const addMoney = () => {
    // find user in masterData using id
    if (!!inputValue) {
      const priceAfterIncrement = inputValue * MONEY_INCREMENT_LEVEL;
      const change = priceAfterIncrement
      const amount = modalInfo.amount + change

      const clonedMasterData = Object.assign([], masterData);
      removeItemFromArray(clonedMasterData, currentPersonInMasterData);
      clonedMasterData.push({
        id: modalInfo.id,
        amount: amount,
        name: modalInfo.name,
      });

      setMasterData(clonedMasterData.sort((a, b) => b.amount - a.amount));

      setSpendingHistory(oldHistory => {
        const clonedHistory = Object.assign([], oldHistory);
        clonedHistory.push(currentSpendingHistory(change, TRANSACTION_TYPE.ADD));

        return clonedHistory
      });
    }
    setIsShowExpenseModal(false);
  }

  const subtractMoney = () => {
    if (!!inputValue) {
      const priceAfterIncrement = inputValue * MONEY_INCREMENT_LEVEL;
      const change = priceAfterIncrement > modalInfo.amount ? modalInfo.amount : priceAfterIncrement
      const amount = modalInfo.amount - change

      const clonedMasterData = Object.assign([], masterData);
      removeItemFromArray(clonedMasterData, currentPersonInMasterData);
      clonedMasterData.push({
        id: modalInfo.id,
        amount: amount,
        name: modalInfo.name,
      });

      setMasterData(clonedMasterData.sort((a, b) => b.amount - a.amount));

      if (modalInfo.amount > 0) {
        setSpendingHistory(oldHistory => {
          const clonedHistory = Object.assign([], oldHistory);
          clonedHistory.push(currentSpendingHistory(change, TRANSACTION_TYPE.SUBTRACT));

          return clonedHistory
        });
      }
    }
    setIsShowExpenseModal(false);
  }

  const getSpendingType = () => !FeatureFlags.CATEGORY_PICKER || category.value === CategoryOther
    ? null
    : CategoriesObj[category.key];

  const currentSpendingHistory = (change, transactionType) => {
    return {
      id: getUuidV4(),
      timestamp: getPrintableDateTime(Date.now()),
      spendingType: getSpendingType(),
      spendingAmount: change,
      spenderId: modalInfo.id,
      spenderName: modalInfo.name,
      transactionType,
      spendingNote: note,
    };
  };

  const onValueChangeLocal = (_itemValue, itemIndex) => {
    setCategory(Categories[itemIndex]);
  };

  return (
    <CustomView>
      <CustomView style={{marginVertical: 10}}>
        {FeatureFlags.CATEGORY_PICKER && (
          <CommonPickerContent
            pickerItems={Categories}
            onValueChange={onValueChangeLocal}
            selectedValue={category.key}
          />
        )}

        {FeatureFlags.NOTES && category.value === CategoryOther && (
          <Input
            value={note}
            onChangeText={(rawText) => {
              setNote(rawText);
            }}
            onSubmitEditing={() => {
              refInput.current?.focus();
            }}
            textAlign={'left'}
            placeholder={'Notes 📝'}
            returnKeyType={'done'}
            maxLength={80}
            autoCapitalize={'sentences'}
            autoCorrect
          />
        )}
        <Input
          innerRef={refInput}
          styleTextInput={styles.priceInput}
          styleWrapper={styles.priceInputContainer}
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
          keyboardType='number-pad'
          textAlign={'right'}
          placeholder={'0'}
          returnKeyType={'done'}
          icon={
            <CustomText semiBold style={{marginRight: 5}}>{getPrintableUnit()}</CustomText>
          }
          iconPosition='right'
          maxLength={6}
        />
      </CustomView>

      <CustomView style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={subtractMoney}
        >
          <CustomText bold color={GlobalColors.darkPink3}>
            SUBTRACT
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rightButton}
          onPress={addMoney}
        >
          <CustomText bold color={GlobalColors.white}>
            ADD
          </CustomText>
        </TouchableOpacity>
      </CustomView>
    </CustomView>
  );
};

export default ExpenseModalComponent;
