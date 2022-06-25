import { StyleSheet } from "react-native";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const CLOCK_SIZE = 130
const styles = StyleSheet.create({
  dashboardOverviewContainer: {
    backgroundColor: GlobalColors.yellow,

    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    // justifyContent: "center",

    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  clockContainer: {
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    borderRadius: CLOCK_SIZE / 2,

    borderWidth: 2,
    borderColor: GlobalColors.pink,
    backgroundColor: GlobalColors.white,

    alignItems: "center",
    justifyContent: "center",
  },
  clockText: {

  },
})

export default styles
