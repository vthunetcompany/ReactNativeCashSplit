import { StyleSheet } from 'react-native';
import {GlobalColors} from '../GlobalStyles';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  modalView: {
    backgroundColor: GlobalColors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    minHeight: 200,
  },

  header: {
    padding: 15,
    paddingBottom: 0,
    alignItems: 'center',
    width: '100%',
  },

  title: {
    fontSize: 25,
    color: GlobalColors.black,
  },

  body: {
    minHeight: 100,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  footer: {
    justifyContent: 'space-evenly',
    paddingVertical: 7,
    alignItems: 'center',
    flexDirection: 'row',
  },

  footerSeparator: {
    height: 0.5,
    backgroundColor: GlobalColors.grey,
  },

  footerItems: {
    width: '100%',
    padding: 10,
  },

  footerText: {
    fontSize: 12,
  },
});
