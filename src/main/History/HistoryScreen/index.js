import React from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import {ScrollView} from 'react-native';
import CustomText from '../../../../shared/Components/CustomText';
import {CURRENCY} from '../../../../shared/GlobalConstants';
import {convertPrice, getPrintableDateTime} from '../../../../shared/Helpers';

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
  console.log('spendingHistory', spendingHistory);

  return (
    <CustomView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {spendingHistory?.map((spendingItem, index) => {
            const {
              id,
              spenderId,
              timestamp,
              spendingType,
              spendingAmount,
              spenderName,
              transactionType,
              spendingNote,
            } = spendingItem;
            return (
              <CustomView
                key={index.toString()}
                style={styles.rowContainer}
              >
                <CustomText selectable>
                  {`${spenderName} ${transactionType} ${convertPrice(spendingAmount)}${CURRENCY} on ${spendingType?.value ?? spendingNote} at ${getPrintableDateTime(timestamp)}`}
                </CustomText>
              </CustomView>
            )
          }
        )}
      </ScrollView>
    </CustomView>
  );
};

export default HistoryScreen;
