import {StyleSheet} from 'react-native'
import { GlobalColors } from '../../../../shared/GlobalStyles';
import {getFontWeight} from "../../../../shared/Components/CustomText";

const FONT_SIZE = 30;
const styles = StyleSheet.create({
  modalButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },

  priceInputContainer: {
    height: FONT_SIZE * 2,
  },
  priceInput: {
    fontSize: FONT_SIZE,
    fontWeight: getFontWeight('semiBold'),
  },

  leftButton: {
    backgroundColor: GlobalColors.white,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: GlobalColors.pink3,

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
export default styles;
