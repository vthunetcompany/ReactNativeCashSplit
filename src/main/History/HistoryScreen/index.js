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
    spendingHistory.forEach(spending => {
      const date = spending.timestamp.split('T')[0];
      const prevState = spendingHistoryGroupedByDate;

      setSpendingHistoryGroupByDate(_prevState => {
        // console.log('run in setSpendingHistoryGroupByDate', prevState)
        if (isEmpty(prevState)) {
          return {
            [date]: [spending],
          };
        }

        return {
          ...prevState,
          [date]: [...prevState?.[date], spending],
        }
      });
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
          Object.keys(spendingHistoryGroupedByDate).map(dateGroup => {
            console.log('dateGroup', dateGroup)
            return (
              <CustomView style={styles.dateGroupContainer}>
                <CustomText style={styles.dateGroupText}>{dateGroup}</CustomText>
                {
                  spendingHistoryGroupedByDate[dateGroup].map(historyRecord => {
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
                      <CustomView style={styles.historyRowContainer}>
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
