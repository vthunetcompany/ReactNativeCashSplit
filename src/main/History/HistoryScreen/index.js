import React, {useEffect, useState} from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import {ScrollView, TouchableOpacity} from 'react-native';
import CustomText from '../../../../shared/Components/CustomText';
import {CURRENCY, TRANSACTION_TYPE} from '../../../../shared/GlobalConstants';
import {
  convertPrice,
  getPrintableDateFromDatetime,
  getPrintableHoursFromDatetime,
  resetSpending
} from '../../../../shared/Helpers';
import isEmpty from 'lodash.isempty';
import {GlobalColors} from "../../../../shared/GlobalStyles";
import {FeatureFlags} from "../../../FeatureFlags";
import AppModal from "../../../../shared/AppModal";
import {ExpenseModalHistoryComponent} from "./ExpenseModalHistoryComponent";

const HistoryScreen = ({
                         dashboardProps,
                       }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
    spendingHistory,
    setSpendingHistory,
  } = dashboardProps;

  const [spendingHistoryGroupedByDate, setSpendingHistoryGroupByDate] = useState({});
  const [isShowExpenseModal, setIsShowExpenseModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [indices, setIndices] = useState({});
  const [isSkipProcessHistoryGroup, toggleSkipProcessHistoryGroup] = useState(false);

  useEffect(() => {
    if (isSkipProcessHistoryGroup) {
      toggleSkipProcessHistoryGroup(false);
      return;
    }

    if (isEmpty(spendingHistory)) {
      // clear all date group spending
      setSpendingHistoryGroupByDate({});
      return;
    }

    let prevState = spendingHistoryGroupedByDate;

    // group spendingHistory by date, when spendingHistory changes
    // update the result to spendingHistoryGroupedByDate
    spendingHistory.forEach(spending => {
      const date = spending.timestamp.split('T')[0];

      const getNewSpending = () => {
        if (isEmpty(prevState)) {
          // create a new entry if first spending
          return {
            [date]: [spending],
          };
        }

        if (!Object.keys(prevState).includes(date)) {
          // create a new entry on a new date
          return FeatureFlags.ORDER_HISTORY_CHRONOLOGICALLY
            ? {
              [date]: [spending],
              ...prevState,
            }
            : {
              ...prevState,
              [date]: [spending],
            };
        }

        // write on past entry
        return {
          ...prevState,
          [date]: FeatureFlags.ORDER_HISTORY_CHRONOLOGICALLY
            ? [spending, ...prevState?.[date]]
            : [...prevState?.[date], spending],
        }
      }
      const newSpending = getNewSpending();
      setSpendingHistoryGroupByDate(newSpending);

      // post-processing
      if (isEmpty(spendingHistoryGroupedByDate)) {
        // on init, append value to `prevState` to populate `spendingHistoryGroupedByDate`
        prevState = newSpending;
      }
    });
  }, [spendingHistory]);

  const clearHistory = () => {
    console.debug('CLEAR HISTORY');
    setSpendingHistory([]);

    // clear spending in masterData
    setMasterData(resetSpending(masterData));
  };

  const modalProp = {
    setIsShowExpenseModal,
    selectedRow,
    spendingHistoryGroupedByDate,
    setSpendingHistoryGroupByDate,
    toggleSkipProcessHistoryGroup,
    indices,
  };

  return (
    <CustomView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {
          Object.keys(spendingHistoryGroupedByDate).map((dateGroup, dateGroupIdx) => {
            return (
              <CustomView
                key={dateGroupIdx.toString()}
                style={styles.dateGroupContainer}
              >
                <CustomView style={styles.dateContainer}>
                  <CustomText medium style={styles.dateText}>{getPrintableDateFromDatetime(dateGroup)}</CustomText>
                </CustomView>
                {
                  spendingHistoryGroupedByDate[dateGroup].map((historyRecord, historyRecordIdx) => {
                    const {
                      id,
                      spenderId,
                      timestamp,
                      spendingType,
                      spendingAmount,
                      spenderName,
                      transactionType,
                      spendingNote,
                    } = historyRecord;

                    return (
                      <TouchableOpacity
                        key={historyRecordIdx}
                        style={{
                          ...styles.historyRowContainer,
                          ...(
                            transactionType === TRANSACTION_TYPE.ADD
                              ? styles.historyRowContainerAdd
                              : styles.historyRowContainerSubtract
                          )
                        }}
                        activeOpacity={0.4}
                        onPress={() => {
                          setIsShowExpenseModal(true);
                          setSelectedRow(historyRecord);
                          setIndices({ dateGroupIdx, historyRecordIdx });
                        }}
                      >
                        <CustomView style={styles.leftColumn}>
                          <CustomView style={styles.leftColumnLeftEmojiContainer}>
                            <CustomText xxLarge>{spendingType?.emoji ?? ''}</CustomText>
                          </CustomView>

                          <CustomView>
                            <CustomText semiBold>{spenderName}
                            </CustomText>
                            <CustomText light>{
                              spendingType?.value
                                ? spendingType.value
                                : `Other: ${spendingNote}`
                            }</CustomText>
                            <CustomText xLight>{getPrintableHoursFromDatetime(timestamp)}</CustomText>
                          </CustomView>
                        </CustomView>
                        <CustomView style={styles.rightColumn}>
                          <CustomText
                            style={styles.priceText}
                            color={transactionType === TRANSACTION_TYPE.ADD ? null : GlobalColors.pure_red}
                            bold
                          >
                            {`${transactionType === TRANSACTION_TYPE.ADD ? '' : '-'} ${convertPrice(spendingAmount)}${CURRENCY}`}
                          </CustomText>
                        </CustomView>
                      </TouchableOpacity>
                    )
                  })
                }
              </CustomView>
            )
          })
        }
      </ScrollView>
      {
        !isEmpty(spendingHistory) && (
          <CustomView style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.removeButton}
              onLongPress={clearHistory}
            >
              <CustomText
                large
                color={GlobalColors.pure_red}
              >
                𝕏
              </CustomText>
            </TouchableOpacity>
          </CustomView>
        )
      }
      <AppModal
        title={selectedRow?.spenderName}
        modalBody={<ExpenseModalHistoryComponent
          modalProp={modalProp}
          masterDataProp={dashboardProps}
        />}
        modalVisible={isShowExpenseModal}
        modalFooter={<></>}
        setModalVisible={setIsShowExpenseModal}
        showExitIcon />
    </CustomView>
  );
};

export default HistoryScreen;
