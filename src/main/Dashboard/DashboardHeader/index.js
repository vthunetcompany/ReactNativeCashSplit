import CustomView from "../../../../shared/Components/CustomView";
import CustomText from "../../../../shared/Components/CustomText";
import { APP_NAME } from "../../../../shared/GlobalConstants";
import { TouchableOpacity, useColorScheme } from "react-native";
import React, { useEffect } from "react";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";

const DashboardHeader = () => {
  useEffect(() => {

  }, []);
  const isDarkMode = useColorScheme() === "dark";

  return (
    <CustomView style={[styles.headerTitleContainer,
      isDarkMode ? { backgroundColor: GlobalColors.grey } : {},
    ]}>
      <CustomText style={styles.headerTitleText} supportDarkMode large>{APP_NAME}</CustomText>

      <TouchableOpacity style={styles.headerRightButton}>
        <Icon
          type={IconRoutes.FAIcon5}
          name={"money-check"}
          size={18}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>
    </CustomView>
  );
};

export default DashboardHeader;
