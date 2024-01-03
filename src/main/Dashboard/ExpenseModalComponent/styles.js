import {StyleSheet} from 'react-native'
import { GlobalColors } from '../../../../shared/GlobalStyles';

const styles = StyleSheet.create({
  modalContainer: {
    height: 200,
  },

  modalButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  leftButton: {
    backgroundColor: GlobalColors.white,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: GlobalColors.pure_red,

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