import React, { useEffect } from "react";
import CustomView from "../../../shared/Components/CustomView";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../../shared/GlobalStyles";
import CustomText from "../../../shared/Components/CustomText";
import { SPLASH_DURATION_IN_MILLIS, VERSION } from "../../../shared/GlobalConstants";

const SplashScreen = ({ setIsShowSplash }) => {

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, SPLASH_DURATION_IN_MILLIS);
  }, []);

  return (
    <CustomView style={styles.splashContainer}>
      <Image
        style={styles.logoImg}
        source={require("../../assets/images/appLogo.png")}
        width={200}
        height={200}
      />

      <ActivityIndicator
        loading
        color={GlobalColors.pink1}
        style={styles.loading}
      />

      <CustomText
        bold
        style={styles.signatureSplashText}
        color={GlobalColors.white}
      >
        {`A product by VTH® Corp\n\n`}
        {`Version ${VERSION}`}
      </CustomText>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: GlobalColors.logo_grey,

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoImg: {
    height: 200,
  },

  loading: {
    position: "absolute",
    bottom: 200,
  },

  signatureSplashText: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    textAlign: 'center',
  },
});

export default SplashScreen;
