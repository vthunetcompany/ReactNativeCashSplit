import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomView from "../../../../../shared/Components/CustomView";
import {FeatureFlags} from "../../../../FeatureFlags";
import CommonPickerContent from "../../../../../shared/Components/CommonPickerContent";
import {Categories, CategoriesObj, CategoryOther} from "../../../../storage/Catogories";
import Input from "../../../../../shared/Input";
import {
  cloneDeep,
  convertPrice,
  customReplaceAll,
  getPrintableUnit,
  getUuidV4,
  handleException,
  removeItem,
} from "../../../../../shared/Helpers";
import {MONEY_INCREMENT_LEVEL, THOUSAND_SEPARATOR} from "../../../../../shared/GlobalConstants";
import CustomText, {getFontWeight} from "../../../../../shared/Components/CustomText";
import {GlobalColors} from "../../../../../shared/GlobalStyles";

export const ExpenseModalHistoryComponent = ({
                                               modalProp,
                                               masterDataProp,
                                             }) => {
  const {
    setIsShowExpenseModal,
    selectedRow: {
      id,
      spenderId,
      timestamp,
      spendingType,
      spendingAmount,
      spenderName,
      transactionType,
      spendingNote,
    },
    spendingHistoryGroupedByDate,
    setSpendingHistoryGroupByDate,
    toggleSkipProcessHistoryGroup,
    indices: {
      dateGroupIdx,
      historyRecordIdx,
    },
  } = modalProp;

  const {
    masterData,
    setMasterData,
    loadData,
    spendingHistory,
    setSpendingHistory,
  } = masterDataProp;

  const initialCategory = Categories.find(category => category.value.includes(spendingType?.value))
    ?? Categories[Categories.length - 1];
  const [category, setCategory] = useState(initialCategory);

  const initialPrice = spendingAmount / MONEY_INCREMENT_LEVEL;
  const [inputValue, setInputValue] = useState(initialPrice);
  const [showValue, setShowValue] = useState(convertPrice(initialPrice));
  const [note, setNote] = useState(spendingNote);
  const refInput = useRef(null);

  const getRealValue = (v) => {
    return customReplaceAll(v, THOUSAND_SEPARATOR, '');
  };

  const onValueChangeLocal = (_itemValue, itemIndex) => {
    setCategory(Categories[itemIndex]);
  };

  useEffect(() => {
    if (!showValue) {
      setInputValue(0);
      return;
    }
    setInputValue(Number(getRealValue(showValue)));
  }, [showValue]);

  const getSpendingType = () => !FeatureFlags.CATEGORY_PICKER || category.value === CategoryOther
    ? null
    : CategoriesObj[category.key];

  const editSpending = () => {
    if (
      category === initialCategory &&
      inputValue === initialPrice &&
      note?.localeCompare(spendingNote) === 0
    ) {
      console.debug('Closing. Nothing was changed');
      setIsShowExpenseModal(false);
      return;
    }

    try {
      const thisSpendingHistory = spendingHistory.find(spending => spending.id === id);
      const newThisSpendingHistory = {
        ...thisSpendingHistory,
        id: getUuidV4(),
        spendingType: getSpendingType(),
        spendingAmount: inputValue * MONEY_INCREMENT_LEVEL,
        spendingNote: note,
      };

      // edit spendingHistory
      console.info('Edit spendingHistory');
      let spendingHistoryClone = cloneDeep(spendingHistory);
      const indexHistory = spendingHistoryClone.findIndex(item => item.id === thisSpendingHistory.id);
      spendingHistoryClone[indexHistory] = newThisSpendingHistory;
      setSpendingHistory(spendingHistoryClone);

      // edit spendingHistoryGroupedByDate
      console.info('Edit spendingHistoryGroupedByDate');
      const date = thisSpendingHistory.timestamp.split('T')[0];
      let spendingHistoryGroupByDateClone = cloneDeep(spendingHistoryGroupedByDate);
      const indexGroup = spendingHistoryGroupedByDate[date].findIndex(item => item.id === thisSpendingHistory.id);

      spendingHistoryGroupByDateClone[date][indexGroup] = newThisSpendingHistory;
      setSpendingHistoryGroupByDate(spendingHistoryGroupByDateClone);
      toggleSkipProcessHistoryGroup(true);

      // edit masterData
      console.info('Update masterData');
      const amountDiff = thisSpendingHistory.spendingAmount - newThisSpendingHistory.spendingAmount;
      if (amountDiff === 0) {
        return;
      }

      const masterDataClone = cloneDeep(masterData);
      const thisMasterDatum = masterData.find(masterDatum => masterDatum.id === thisSpendingHistory.spenderId);

      masterDataClone[masterData.findIndex(masterDatum => masterDatum.id === thisSpendingHistory.spenderId)] = {
        ...thisMasterDatum,
        amount: thisMasterDatum.amount - amountDiff,
      };
      setMasterData(masterDataClone);
    } catch (err) {
      handleException(err, 'editSpending()');
    } finally {
      // close modal on finishing
      setIsShowExpenseModal(false);
    }
  };

  const removeSpending = () => {
    console.info('REMOVE');
    try {
      const thisSpendingHistory = spendingHistory.find(spending => spending.id === id);

      // edit spendingHistory
      console.info('Remove item from spending history');
      let spendingHistoryClone = cloneDeep(spendingHistory);
      const indexHistory = spendingHistoryClone.findIndex(item => item.id === thisSpendingHistory.id);
      removeItem(spendingHistoryClone, indexHistory);
      setSpendingHistory(spendingHistoryClone);

      // edit spendingHistoryGroupedByDate
      console.info('Remove item from history grouped by date');
      const date = thisSpendingHistory.timestamp.split('T')[0];
      let spendingHistoryGroupByDateClone = cloneDeep(spendingHistoryGroupedByDate);
      const indexGroup = spendingHistoryGroupedByDate[date].findIndex(item => item.id === thisSpendingHistory.id);

      removeItem(spendingHistoryGroupByDateClone[date], indexGroup);
      setSpendingHistoryGroupByDate(spendingHistoryGroupByDateClone);
      toggleSkipProcessHistoryGroup(true);

      // edit masterData
      console.info('Update masterData');
      const masterDataClone = cloneDeep(masterData);
      const thisMasterDatum = masterData.find(masterDatum => masterDatum.id === thisSpendingHistory.spenderId);

      masterDataClone[masterData.findIndex(masterDatum => masterDatum.id === thisSpendingHistory.spenderId)] = {
        ...thisMasterDatum,
        amount: thisMasterDatum.amount - thisSpendingHistory.spendingAmount,
      };

      setMasterData(masterDataClone);
    } catch (e) {
      handleException(e, 'removeSpending()');
    } finally {
      // close modal on finishing
      setIsShowExpenseModal(false);
    }
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
          onSubmitEditing={editSpending}
          keyboardType='number-pad'
          textAlign={'right'}
          placeholder={convertPrice(spendingAmount / MONEY_INCREMENT_LEVEL)}
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
          onPress={removeSpending}
        >
          <CustomText bold color={GlobalColors.pure_red}>
            Remove
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rightButton}
          onPress={editSpending}
        >
          <CustomText bold color={GlobalColors.white}>
            Confirm
          </CustomText>
        </TouchableOpacity>
      </CustomView>
    </CustomView>
  );
};

const FONT_SIZE = 30;
const styles = StyleSheet.create({
  modalButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },

  priceInputContainer: {
    height: FONT_SIZE * 2,
  },
  priceInput: {
    fontSize: FONT_SIZE,
    fontWeight: getFontWeight('semiBold'),
  },

  leftButton: {
    backgroundColor: GlobalColors.white,

    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
  rightButton: {
    backgroundColor: GlobalColors.pink3,
    borderRadius: 5,

    flex: 2,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 5,
  },

})
export default styles;
