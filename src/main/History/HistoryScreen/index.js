import React, {useEffect, useState} from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import {ScrollView} from 'react-native';
import CustomText from '../../../../shared/Components/CustomText';
import {CURRENCY, TRANSACTION_TYPE} from '../../../../shared/GlobalConstants';
import {convertPrice, getPrintableDateFromDatetime, getPrintableHoursFromDatetime} from '../../../../shared/Helpers';
import isEmpty from 'lodash.isempty';

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
  // console.log('spendingHistory', spendingHistory);

  const [spendingHistoryGroupedByDate, setSpendingHistoryGroupByDate] = useState({});

  useEffect(() => {
    // group spendingHistory by date, when spendingHistory changes
    // update the result to spendingHistoryGroupedByDate
    spendingHistory.forEach(spending => {
      const date = spending.timestamp.split('T')[0];
      const prevState = spendingHistoryGroupedByDate;

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

      setSpendingHistoryGroupByDate(newSpending);
    });
  }, [spendingHistory]);

  useEffect(() => {
    console.log('spendingHistoryGroupedByDate', JSON.stringify(spendingHistoryGroupedByDate))
  }, [spendingHistoryGroupedByDate]);

  return (
    <CustomView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {
          Object.keys(spendingHistoryGroupedByDate).map((dateGroup, dateGroupIdx) => {
            console.log('dateGroup', dateGroup)
            return (
              <CustomView
                key={dateGroupIdx.toString()}
                style={styles.dateGroupContainer}
              >
                <CustomView style={styles.dateContainer}>
                  <CustomText style={styles.dateText}>{getPrintableDateFromDatetime(dateGroup)}</CustomText>
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
                      <CustomView
                        key={historyRecordIdx}
                        style={{
                          ...styles.historyRowContainer,
                          ...(
                            transactionType === TRANSACTION_TYPE.ADD
                              ? styles.historyRowContainerAdd
                              : styles.historyRowContainerSubtract
                          )
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
                          <CustomText style={styles.priceText} bold>
                            {`${transactionType === TRANSACTION_TYPE.ADD ? '+' : '-'} ${convertPrice(spendingAmount)}${CURRENCY}`}
                          </CustomText>
                        </CustomView>
                      </CustomView>
                    )
                  })
                }
              </CustomView>
            )
          })
        }
      </ScrollView>
    </CustomView>
  )
    ;
};

export default HistoryScreen;
