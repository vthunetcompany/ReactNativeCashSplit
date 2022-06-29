import React, { useEffect } from "react";
import CustomView from "../../../shared/Components/CustomView";
import { Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../../shared/GlobalStyles";

const SplashScreen = ({ setIsShowSplash }) => {

  useEffect(() => {
    setTimeout(() => {
      // setIsShowSplash(false);
    }, 2000);
  }, []);

  return (<CustomView style={styles.splashContainer}>

    <Image
      source={{ uri: "../../../assets/images/appLogo.png" }}
      style={styles.appLogoImage}
      width={50}
      height={50}
    />

  </CustomView>);
};

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: GlobalColors.shadowColor,

    flex: 1,
  },

  appLogoImage: {
    height: 20,
  },
});

export default SplashScreen;
