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
        {spendingHistory?.map((i1, i2) =>
          <CustomText>
            {i1.spenderName + ' ' + i1.transactionType + ' ' + convertPrice(i1.spendingAmount) + CURRENCY}
          </CustomText>,
        )}
      </ScrollView>
    </CustomView>
  );
};

export default HistoryScreen;
