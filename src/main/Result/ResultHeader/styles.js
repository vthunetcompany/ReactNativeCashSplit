import { StyleSheet } from "react-native";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  headerTitleContainer: {
    paddingBottom: 10,
    backgroundColor: GlobalColors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderBottomWidth: 0.25,
    borderColor: GlobalColors.grey,
  },
  headerTitleText: {},

  headerLeftButton: {
    position: "absolute",
    left: 0,
    bottom: 0,

    padding: 10,
    paddingLeft: 10,
    overflow: "visible",
  },

  headerRightButton: {
    position: "absolute",
    right: 0,
    bottom: 0,

    padding: 10,
    paddingRight: 15,
    overflow: "visible",
  },
});

export default styles
