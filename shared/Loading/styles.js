import { StyleSheet } from 'react-native';
import { globalColors } from '../../../assets/styles/global';

export default StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: globalColors.opacityBgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: globalColors.white,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
  },
  text: {
    marginLeft: 12,
  },
});
