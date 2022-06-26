import { StyleSheet } from 'react-native';
import { GlobalColors } from "../GlobalStyles";

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: GlobalColors.opacityBgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: GlobalColors.white,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    marginLeft: 12,
  },
});
