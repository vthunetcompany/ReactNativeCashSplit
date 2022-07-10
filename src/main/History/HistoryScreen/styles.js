import { StyleSheet } from 'react-native'
import { GlobalColors } from "../../../../shared/GlobalStyles";

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


})

export default styles
