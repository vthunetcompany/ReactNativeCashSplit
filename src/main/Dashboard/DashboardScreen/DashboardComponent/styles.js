import { StyleSheet } from 'react-native';
import {GlobalColors, Shadow5} from '../../../../../shared/GlobalStyles';

const dashboardRowContainer = {
  borderRadius: 14,
  marginVertical: 10,
  marginHorizontal: 22,

  paddingVertical: 20,
  paddingHorizontal: 13,

  ...Shadow5,

  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  dashboardScreenScrollViewContainer: {
    backgroundColor: GlobalColors.background_color,
    alignSelf: 'stretch',
    flex: 6,
  },

  dashboardPersonRowContainer: {
    ...dashboardRowContainer,
    backgroundColor: GlobalColors.white,
    borderWidth: 0.5,
    borderColor: GlobalColors.black,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dashBoardFooterContainer: {
    ...dashboardRowContainer,
    backgroundColor: GlobalColors.white,
    borderWidth: 1.5,
    borderColor: GlobalColors.darkPink1,

    flexDirection: 'row',
  },

  personRowNameText: {

  },
  personRowAmountText: {},
});

export default styles
