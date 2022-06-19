import React from "react";
import { Text } from "react-native";
import { DEFAULT_FONTSIZE } from "../GlobalStyles";

const CustomText = ({ children, style, small, large}) => {
  let FONTSIZE = DEFAULT_FONTSIZE

  if (small) FONTSIZE = 12
  else if (large) FONTSIZE = 20

  return (
    <Text style={[style, {
      fontSize: FONTSIZE,
    }]}>
      {children}
    </Text>
  );
};

export default CustomText;
