import React, { useEffect } from "react";
import CustomView from "../../../shared/Components/CustomView";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../../shared/GlobalStyles";
import CustomText from "../../../shared/Components/CustomText";
import Loading from "../../../shared/Loading";

const SplashScreen = ({ setIsShowSplash }) => {

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
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
        style={styles.signatureSplash}
        color={GlobalColors.white}
      >
        A product by VTH® Corp
      </CustomText>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: GlobalColors.black,

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

  signatureSplash: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});

export default SplashScreen;
