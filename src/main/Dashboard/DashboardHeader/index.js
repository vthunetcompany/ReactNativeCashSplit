import CustomView from "../../../../shared/Components/CustomView";
import CustomText from "../../../../shared/Components/CustomText";
import { APP_NAME } from "../../../../shared/GlobalConstants";
import { ScrollView, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";

const DashboardHeader = () => {
  useEffect(() => {

  }, []);
  const isDarkMode = useColorScheme() === "dark";

  return (
    <CustomView style={[styles.headerTitleContainer,
      isDarkMode ? { backgroundColor: GlobalColors.grey } : {},
    ]}>
      <CustomText style={styles.headerTitleText} supportDarkMode large>{APP_NAME}</CustomText>
    </CustomView>
  );
};

export default DashboardHeader;
