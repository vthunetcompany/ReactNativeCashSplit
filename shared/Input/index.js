import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';
import { GlobalColors } from "../GlobalStyles";
import CustomText from "../Components/CustomText";

const Input = ({
  error,
  label,
  icon,
  iconPosition,
  innerRef,
  onChangeText,
  onSubmitEditing,
  styleTextInput,
  styleWrapper,
  styleContainer,
  value,
  maxLength,
  placeholder,
  ...props
}) => {
  const [focused, setFocused] = useState(false);


  const getBorderColor = () => {
    if (error) {
      return GlobalColors.pure_red;
    }
    if (focused) {
      return GlobalColors.darkPink1;
    } else {
      return GlobalColors.pink;
    }
  };

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  return (
    <View style={[styles.inputContainer, styleContainer]}>
      {label && <CustomText style={styles.inputLabel}>{label}</CustomText>}

      <View
        style={[
          styles.wrapper,
          {
            alignItems: icon ? 'center' : 'baseline',
            borderColor: getBorderColor(),
            flexDirection: getFlexDirection(),
            borderWidth: focused ? 1.65 : 1,
          },
          styleWrapper,
        ]}
      >
        <View>{icon && icon}</View>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          ref={innerRef}
          style={[styles.textInput, styleTextInput]}
          value={value}
          onFocus={() => setFocused(true)}
          onEndEditing={() => setFocused(false)}
          placeholder={placeholder}
          {...props}
        />
      </View>
    </View>
  );
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.object,
  iconPosition: PropTypes.string,
  innerRef: PropTypes.object,
  onChangeText: PropTypes.func,
  onPressIcon: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  styleContainer: PropTypes.object,
  maxLength: PropTypes.number,

  styleTextInput: PropTypes.object,
  styleWrapper: PropTypes.object,

  value: PropTypes.string,
};

Input.defaultProps = {
  maxLength: 35,
};

export default Input;
