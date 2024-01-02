import PropTypes from 'prop-types';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  LogBox,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { GlobalColors } from '../GlobalStyles';
import CustomText from '../Components/CustomText';
import Loading from '../Loading';

const AppModal = ({
  modalVisible,
  modalFooter,
  modalBody,
  modalBodyStyle,
  title,
  setModalVisible,
  closeOnTouchOutside,
  onTouchOutside,
  loading,
  showExitIcon,
}) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  return (
    <Modal animationType={'fade'} visible={modalVisible} transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.wrapper}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            if (closeOnTouchOutside) {
              setModalVisible(false);
              if (onTouchOutside) onTouchOutside();
            }
          }}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 50,
              justifyContent: 'center',
              flexGrow: 1,
            }}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.modalView}>
              <ScrollView
                keyboardShouldPersistTaps='handled'
                scrollEnabled={false}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}
                >
                  <View>
                    <View style={styles.header}>
                      {/*HEADER*/}
                      {showExitIcon ? (
                        <View
                          style={{
                            width: '100%',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TouchableOpacity
                            hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
                            style={{
                              width: 27,
                              height: 27,
                              backgroundColor: GlobalColors.white,
                              alignItems: 'center',
                              justifyContent: 'center',
                              resizeMode: 'contain',
                            }}
                            onPress={() => {
                              setModalVisible(false);
                            }}
                          >
                            <Icon size={27} name='close' />
                          </TouchableOpacity>
                        </View>
                      ) : null}

                      <View>
                        <CustomText bold large style={styles.title}>
                          {title || ''}
                        </CustomText>
                      </View>
                    </View>

                    {/*BODY*/}
                    <View style={[styles.body, modalBodyStyle]}>
                      {modalBody}
                    </View>
                    {modalFooter}
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Loading loading={loading} />
    </Modal>
  );
};

AppModal.propTypes = {
  closeOnTouchOutside: PropTypes.bool,

  modalVisible: PropTypes.bool,
  modalFooter: PropTypes.object,
  modalBody: PropTypes.object,
  title: PropTypes.string,
  setModalVisible: PropTypes.func,
  onTouchOutside: PropTypes.func,
  loading: PropTypes.bool,
  modalBodyStyle: PropTypes.object,
  showExitIcon: PropTypes.bool,
};

AppModal.defaultProps = {
  closeOnTouchOutside: true,
};

export default AppModal;
