import { StyleSheet } from "react-native";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const styles = StyleSheet.create({
  dashboardScreenScrollViewContainer: {
    backgroundColor: GlobalColors.background_color,
    alignItems: "center",
    flex: 1,
  },
  flatListContainer: {
    flex: 1,
  },
});

export default styles
