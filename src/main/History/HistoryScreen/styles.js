import { StyleSheet } from 'react-native'
import { GlobalColors } from '../../../../shared/GlobalStyles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.background_color,
    flex: 1,
  },

  scrollViewContentContainer: {
    paddingTop: 12,
    paddingBottom: 5,
  },

  rowContainer: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: GlobalColors.black,

    paddingVertical: 7,
    paddingHorizontal: 12,
  },
})

export default styles
