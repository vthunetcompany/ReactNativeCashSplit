import CustomView from '../../../../shared/Components/CustomView';
import CustomText from '../../../../shared/Components/CustomText';
import { TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import styles from './styles';
import { GlobalColors as GlobalColors } from '../../../../shared/GlobalStyles';
import Icon from '../../../../shared/Icon';
import { IconRoutes } from '../../../../shared/Icon/IconRoutes';
import { ROUTES } from '../../../storage/Routes';

const HistoryHeader = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const onPressLeft = () => {
    navigation.navigate(ROUTES.DASHBOARD_SCREEN);
  }

  const onPressRight = () => {
    navigation.navigate(ROUTES.RESULT_SCREEN);
  }

  return (
    <CustomView style={[styles.headerTitleContainer,
      isDarkMode ? { backgroundColor: GlobalColors.grey } : {},
    ]}>
      <TouchableOpacity style={styles.headerLeftButton} onPress={onPressLeft}>
        <Icon
          type={IconRoutes.AntDesign}
          name={'left'}
          size={24}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>


      <CustomText style={styles.headerTitleText} supportDarkMode bold large>
        History
      </CustomText>

      <TouchableOpacity style={styles.headerRightButton} onPress={onPressRight}>
        <Icon
          type={IconRoutes.MaterialCommunityIcons}
          name={'credit-card-scan'}
          size={24}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>
    </CustomView>
  );
};

export default HistoryHeader;
