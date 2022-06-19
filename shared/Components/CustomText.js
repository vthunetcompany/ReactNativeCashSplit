import React from "react";
import { Text, useColorScheme } from "react-native";
import { DEFAULT_FONTSIZE, globalColors as GlobalColors } from "../GlobalStyles";

const CustomText = ({ children, style, small, large, supportDarkMode}) => {
  let FONTSIZE = DEFAULT_FONTSIZE
  const isDarkMode = useColorScheme() === "dark";

  if (small) FONTSIZE = 12
  else if (large) FONTSIZE = 20

  return (
    <Text style={[style, {
      fontSize: FONTSIZE,
      color: supportDarkMode && isDarkMode ? GlobalColors.white : GlobalColors.shadowColor,
    }]}>
      {children}
    </Text>
  );
};

export default CustomText;
