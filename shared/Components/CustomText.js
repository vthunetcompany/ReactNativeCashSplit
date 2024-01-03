import React from 'react';
import {Platform, Text, useColorScheme} from 'react-native';
import {DEFAULT_FONTSIZE, GlobalColors} from '../GlobalStyles';

const boldStyle = Platform.OS === 'ios' ? '600' : 'bold';
const semiBoldStyle = Platform.OS === 'ios' ? '500' : 'bold';
const normalStyle = Platform.OS === 'ios' ? '400' : 'normal';
export const getFontWeight = (fontWeight) => {
  if (!fontWeight) {
    return normalStyle;
  }

  switch (fontWeight) {
    case 'bold':
      return boldStyle;
    case 'semiBold':
      return semiBoldStyle;
    default:
      return normalStyle;
  }
};

const CustomText = ({
                      children,
                      style,
                      small,
                      medium,
                      large,
                      xLarge,
                      supportDarkMode,
                      bold,
                      semiBold,
                      color,
                      ...props
                    }) => {
  let FONTSIZE = DEFAULT_FONTSIZE;
  const isDarkMode = useColorScheme() === 'dark';

  if (small) FONTSIZE = 12;
  else if (medium) FONTSIZE = 16;
  else if (large) FONTSIZE = 20;
  else if (xLarge) FONTSIZE = 26;

  const getFontWeight = () => {
    if (bold) return boldStyle;
    if (semiBold) return semiBoldStyle;
    return normalStyle;
  };

  const getColor = () => {
    if (!!color) return color
    return supportDarkMode && isDarkMode ? GlobalColors.white : GlobalColors.shadowColor
  }

  return (
    <Text
      style={[style, {
        fontSize: FONTSIZE,
        color: getColor(),
        fontWeight: getFontWeight(),
      }]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
