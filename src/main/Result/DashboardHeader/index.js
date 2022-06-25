import CustomView from "../../../../shared/Components/CustomView";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import styles from "./styles";
import { globalColors as GlobalColors } from "../../../../shared/GlobalStyles";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";
import { ROUTES } from "../../../storage/Routes";

const ResultHeader = ({ navigation }) => {
  const isDarkMode = useColorScheme() === "dark";

  const onPress = () => {
    navigation.navigate(ROUTES.DASHBOARD_SCREEN)
  }

  return (
    <CustomView style={[styles.headerTitleContainer,
      isDarkMode ? { backgroundColor: GlobalColors.grey } : {},
    ]}>
      <TouchableOpacity style={styles.headerLeftButton} onPress={onPress}>
        <Icon
          type={IconRoutes.AntDesign}
          name={"left"}
          size={24}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>


      <CustomText style={styles.headerTitleText} supportDarkMode large>
        Checkout
      </CustomText>
    </CustomView>
  );
};

export default ResultHeader;
