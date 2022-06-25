import React from "react";
import { Platform, Text, useColorScheme } from "react-native";
import { DEFAULT_FONTSIZE, globalColors as GlobalColors } from "../GlobalStyles";

const CustomText = ({
                      children,
                      style,
                      small,
                      large,
                      supportDarkMode,
                      bold,
                      ...props
                    }) => {
  let FONTSIZE = DEFAULT_FONTSIZE;
  const isDarkMode = useColorScheme() === "dark";

  if (small) FONTSIZE = 12;
  else if (large) FONTSIZE = 20;

  const getFontWeight = () => {
    if (bold) return Platform.OS === "ios" ? "600" : "bold";
    return Platform.OS === "ios" ? "400" : "normal";
  };

  return (
    <Text
      style={[style, {
        fontSize: FONTSIZE,
        color: supportDarkMode && isDarkMode ? GlobalColors.white : GlobalColors.shadowColor,
        fontWeight: getFontWeight(),
      }]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
