import {StyleSheet} from 'react-native'
import { GlobalColors } from '../../../../shared/GlobalStyles';

const styles = StyleSheet.create({
  editNameModalContainer: {

  },

  modalButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  leftButton: {
    backgroundColor: GlobalColors.white,
    borderRadius: 5,

    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
  rightButton: {
    backgroundColor: GlobalColors.pink3,
    borderRadius: 5,

    flex: 2,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 5,
  },

})

export default styles
