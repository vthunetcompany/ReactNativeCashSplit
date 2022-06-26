import { StyleSheet } from "react-native";
import { GlobalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  headerTitleContainer: {
    height: 45,
    backgroundColor: GlobalColors.white,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",

    borderBottomWidth: 0.25,
    borderColor: GlobalColors.grey,
  },
  headerTitleText: {
    marginLeft: 20,
    paddingBottom: 5,
  },

  headerRightButton: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },

});

export default styles
