import { StyleSheet } from "react-native";
import { GlobalColors } from "../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  resultScrollContainer: {
    backgroundColor: GlobalColors.background_color,

    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  resultViewContainer: {
    flex: 1,
  },

  sectionViewContainer: {
    backgroundColor: GlobalColors.white,
    shadowColor: GlobalColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftCol: {

  },
  rightCol: {

  },

})
export default styles
