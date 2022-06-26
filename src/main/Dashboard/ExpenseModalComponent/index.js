import {StyleSheet} from 'react-native'
import { GlobalColors } from "../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: GlobalColors.yellow,

    height: 200,
  },


  modalButtonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  leftButton: {
    backgroundColor: GlobalColors.pure_red,
    borderRadius: 5,

    flex: 2,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
  rightButton: {
    backgroundColor: GlobalColors.pink,
    borderRadius: 5,

    flex: 5,
    marginLeft: 10,
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 5,
  },

})
export default styles
