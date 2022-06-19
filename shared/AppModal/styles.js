import { StyleSheet } from 'react-native';
import { globalColors } from '../../../assets/styles/global';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  modalView: {
    backgroundColor: globalColors.white,
    marginHorizontal: 20,
    borderRadius: 4,
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
    color: globalColors.black,
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

  termsView: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: globalColors.grey,
  },

  footerSeparator: {
    height: 0.5,
    backgroundColor: globalColors.grey,
  },

  footerItems: {
    width: '100%',
    padding: 10,
  },

  footerText: {
    fontSize: 12,
  },
});
