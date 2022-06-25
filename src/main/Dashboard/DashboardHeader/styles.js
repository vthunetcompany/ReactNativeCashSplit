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

  headerRightButton: {
  position: 'absolute',
    right: 5,
    bottom: 2,
    padding: 10,
    overflow: 'visible'
},

});

export default styles
