import { StyleSheet } from 'react-native'
import {GlobalColors, Shadow2, Shadow3} from '../../../../shared/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.background_color,
    flex: 1,
  },

  scrollViewContentContainer: {
    paddingBottom: 5,
  },

  rowContainer: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: GlobalColors.black,

    paddingVertical: 7,
    paddingHorizontal: 12,
  },

  dateGroupContainer: {
    paddingHorizontal: 12,
  },

  dateContainer: {
    marginTop: 12,
    marginBottom: 2,
    // backgroundColor: 'red',
  },
  dateText: {
    paddingVertical: 3,
  },
  historyRowContainer: {
    marginVertical: 3.5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: GlobalColors.white,
    ...Shadow3,
    borderRadius: 10,
  },
  leftColumn: {

  },
  rightColumn: {

  },
  priceText: {

  },
})

export default styles;
