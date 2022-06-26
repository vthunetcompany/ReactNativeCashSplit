import { StyleSheet } from "react-native";
import { GlobalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  headerTitleContainer: {
    height: 45,
    paddingBottom: 10,
    backgroundColor: GlobalColors.white,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderBottomWidth: 0.25,
    borderColor: GlobalColors.grey,
  },
  headerTitleText: {
    marginTop: 7,
  },

  headerLeftButton: {
    position: "absolute",
    left: 0,
    bottom: 0,

    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
    paddingBottom: 12,
    overflow: "visible",
  },

  headerRightButton: {
    position: "absolute",
    right: 0,
    bottom: 0,

    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 15,
    paddingBottom: 12,
    overflow: "visible",
  },
});

export default styles
