import { StyleSheet } from 'react-native';
import { GlobalColors } from '../GlobalStyles';

export default StyleSheet.create({
  inputContainer: {
    paddingVertical: 10,
  },

  wrapper: {
    height: 42,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginTop: 5,
  },

  inputLabel: {},

  error: {
    color: GlobalColors.pure_red,
    paddingTop: 4,
    fontSize: 12,
  },

  inputWrapper: {
    marginLeft: 5,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  },

  textInput: {
    flex: 1,
    width: '100%',
    padding: 5,
  },
});
