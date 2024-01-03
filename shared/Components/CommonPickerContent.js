import {Picker} from '@react-native-picker/picker';
import React, {forwardRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {GlobalColors} from "../GlobalStyles";

const CommonPickerContent = forwardRef(({
                                          pickerItems,
                                          selectedValue,
                                          onValueChange,
                                        }, ref) => {
  return (
    <View style={Platform.OS === 'ios' ? styles.pickerContainerIOS : styles.pickerContainerAndroid}>
      <Picker
        ref={ref}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        mode={Picker.MODE_DIALOG}
      >
        {pickerItems.map(({key, value}, index) => (
          <Picker.Item
            key={index}
            label={value}
            value={key}
          />
        ))}
      </Picker>
    </View>
  );
});

const styles = StyleSheet.create({
  pickerContainerIOS: {
    marginTop: -5,
    marginBottom: -20,
  },
  pickerContainerAndroid: {
    backgroundColor: GlobalColors.white,
    borderWidth: 1,
    borderColor: GlobalColors.grey,
    borderRadius: 4,
    display: 'none',
  },
});

export default CommonPickerContent;
