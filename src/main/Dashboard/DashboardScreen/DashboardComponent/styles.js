import { StyleSheet } from "react-native";
import { globalColors as GlobalColors } from "../../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  dashboardScreenScrollViewContainer: {
    backgroundColor: GlobalColors.background_color,
    alignSelf: "stretch",
    flex: 1,
  },

  dashboardFooterContainer: {
    backgroundColor: GlobalColors.white,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,

    shadowColor: GlobalColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles
