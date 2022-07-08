import { StyleSheet } from "react-native";
import { GlobalColors } from "../../../../shared/GlobalStyles";

const leftColFlex = 2,
  midColFlex = 3, rightColFlex = 2

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.background_color,
    flex: 1,
  },

  scrollViewHeader: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 5,

    alignSelf: "stretch",
    flexDirection: "row",
  },
  leftColHeader: {
    flex: leftColFlex,
  },
  midColHeader: {
    flex: midColFlex,
  },
  rightColHeader: {
    flex: rightColFlex,
    alignItems: "flex-end",
    textAlign: "right",
  },

  resultScrollContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
  },

  resultViewContainer: {
    flex: 1,
    marginBottom: 10,
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
    paddingTop: 20,
    paddingBottom: 5,
    marginBottom: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftCol: {
    flex: leftColFlex,
    justifyContent: 'flex-start',
    marginBottom: 20,
  },

  midAndRightContainer: {
    flex: midColFlex + rightColFlex,
  },

  midAndRightRowContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  midCol: {
    flex: midColFlex,
    marginLeft: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },
  midColIcons: {
    flex: 1,
    flexDirection: 'row',
  },
  midColAmountContainer: {
    flex: 2,
  },

  rightCol: {
    flex: rightColFlex,

    marginLeft: 10,
    justifyContent: 'center',
  },
  rightColText: {
    textAlign: 'right',
  },
})
export default styles
