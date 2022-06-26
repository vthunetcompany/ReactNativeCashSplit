import CustomView from "../../../../shared/Components/CustomView";
import CustomText from "../../../../shared/Components/CustomText";
import { APP_NAME } from "../../../../shared/GlobalConstants";
import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";
import { ROUTES } from "../../../storage/Routes";

const DashboardHeader = ({navigation}) => {
  const isDarkMode = useColorScheme() === "dark";

  const onPress = () => {
    navigation.navigate(ROUTES.RESULT_SCREEN);
  }

  return (
    <CustomView style={[styles.headerTitleContainer,
      isDarkMode ? { backgroundColor: GlobalColors.grey } : {},
    ]}>
      <CustomText style={styles.headerTitleText} supportDarkMode bold xLarge>{APP_NAME}</CustomText>

      <TouchableOpacity style={styles.headerRightButton} onPress={onPress}>
        <Icon
          type={IconRoutes.MaterialCommunityIcons}
          name={"credit-card-scan"}
          size={24}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>
    </CustomView>
  );
};

export default DashboardHeader;
