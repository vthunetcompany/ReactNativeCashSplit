import { StyleSheet } from "react-native";
import { GlobalColors as GlobalColors } from "../../../../../shared/GlobalStyles";

const dashboardRowContainer = {
  borderRadius: 5,
  marginVertical: 10,
  marginHorizontal: 20,

  paddingVertical: 20,
  paddingHorizontal: 10,

  shadowColor: GlobalColors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,

  alignSelf: "stretch",
  alignItems: "center",
  justifyContent: "center",
};

const styles = StyleSheet.create({
  dashboardScreenScrollViewContainer: {
    backgroundColor: GlobalColors.background_color,
    alignSelf: "stretch",
    flex: 6,
  },

  dashboardPersonRowContainer: {
    ...dashboardRowContainer,
    backgroundColor: GlobalColors.white,
    borderWidth: 1,
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
