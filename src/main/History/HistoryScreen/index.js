import React from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import { ScrollView } from 'react-native';
import CustomText from '../../../../shared/Components/CustomText';
import { CURRENCY } from '../../../../shared/GlobalConstants';
import { convertPrice } from '../../../../shared/Helpers';

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
      <ScrollView style={styles.scrollViewHeader}>
        {spendingHistory?.map((spendingItem, index) => (
            <CustomView key={index.toString()}>
              <CustomText>
                {`${spendingItem.spenderName} ${spendingItem.transactionType} ${convertPrice(spendingItem.spendingAmount)}${CURRENCY} on ${spendingItem.spendingType}`}
              </CustomText>
            </CustomView>
          ),
        )}
      </ScrollView>
    </CustomView>
  );
};

export default HistoryScreen;
