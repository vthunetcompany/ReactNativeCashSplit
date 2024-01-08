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

  useEffect(() => {
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
          return {
            ...prevState,
            [date]: [spending],
          }
        }

        // write on past entry
        return {
          ...prevState,
          [date]: [...prevState?.[date], spending],
        }
      }
      const newSpending = getNewSpending();

      if (isEmpty(spendingHistoryGroupedByDate)) {
        // on init, append value to `prevState` to populate `spendingHistoryGroupedByDate`
        prevState = newSpending;
      }
      setSpendingHistoryGroupByDate(newSpending);
    });
  }, [spendingHistory]);

  const clearHistory = () => {
    console.debug('CLEAR HISTORY');
    setSpendingHistory([]);

    // clear spending in masterData
    setMasterData(resetSpending(masterData));
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
      {!isEmpty(spendingHistory) && <CustomView style={styles.footerContainer}>
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
      }
    </CustomView>
  );
};

export default HistoryScreen;
