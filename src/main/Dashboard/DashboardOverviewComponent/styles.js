import { StyleSheet } from "react-native";
import { GlobalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const CLOCK_SIZE = 165
const styles = StyleSheet.create({
  dashboardOverviewContainer: {
    backgroundColor: GlobalColors.background_color,

    flex: 2,
    flexDirection: 'row',
    alignItems: "center",
    overflow: 'hidden',
    justifyContent: "space-between",

    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  clockContainer: {
    width: CLOCK_SIZE,
    height: CLOCK_SIZE,
    borderRadius: CLOCK_SIZE / 2,

    borderWidth: 12,
    borderColor: GlobalColors.pink,
    backgroundColor: GlobalColors.white,

    alignItems: "center",
    justifyContent: "center",
  },
  clockText: {},

  overviewInfoContainer: {
    flex: 1,
    marginLeft: 15,

    alignItems: "center",
    overflow: "hidden",

  },
})

export default styles
