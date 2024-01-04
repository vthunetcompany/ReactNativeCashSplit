import React, {useEffect, useState} from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import {ScrollView, unstable_enableLogBox} from 'react-native';
import CustomText from '../../../../shared/Components/CustomText';
import {CURRENCY, TRANSACTION_TYPE} from '../../../../shared/GlobalConstants';
import {convertPrice} from '../../../../shared/Helpers';
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
        {/*{spendingHistory?.map((spendingItem, index) => {*/}
        {/*    const {*/}
        {/*      id,*/}
        {/*      spenderId,*/}
        {/*      timestamp,*/}
        {/*      spendingType,*/}
        {/*      spendingAmount,*/}
        {/*      spenderName,*/}
        {/*      transactionType,*/}
        {/*      spendingNote,*/}
        {/*    } = spendingItem;*/}
        {/*    return (*/}
        {/*      <CustomView*/}
        {/*        key={index.toString()}*/}
        {/*        style={styles.rowContainer}*/}
        {/*      >*/}
        {/*        <CustomText selectable>*/}
        {/*          {`${spenderName} ${transactionType} ${convertPrice(spendingAmount)}${CURRENCY} on ${spendingType?.value ?? spendingNote} at ${timestamp}`}*/}
        {/*        </CustomText>*/}
        {/*      </CustomView>*/}
        {/*    )*/}
        {/*  }*/}
        {/*)}*/}
        {
          Object.keys(spendingHistoryGroupedByDate).map((dateGroup, dateGroupIdx)  => {
            console.log('dateGroup', dateGroup)
            return (
              <CustomView
                key={dateGroupIdx.toString()}
                style={styles.dateGroupContainer}
              >
                <CustomText style={styles.dateGroupText}>{dateGroup}</CustomText>
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
                        style={styles.historyRowContainer}
                      >
                        <CustomView style={styles.leftColumn}>
                          <CustomText>{spenderName}</CustomText>
                          <CustomText>{spendingType?.value}</CustomText>
                        </CustomView>
                        <CustomView style={styles.rightColumn}>
                          <CustomText style={styles.priceText}>
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
  );
};

export default HistoryScreen;
