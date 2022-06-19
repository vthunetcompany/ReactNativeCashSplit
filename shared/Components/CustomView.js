import React from 'react';
import { View } from "react-native";

const CustomView = ({children, style}) =>  {

  return (
    <View style={style}>{children}</View>
  )
}

export default CustomView
