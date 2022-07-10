import CustomView from "../../../../shared/Components/CustomView";
import CustomText from "../../../../shared/Components/CustomText";
import { TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import styles from "./styles";
import { GlobalColors } from "../../../../shared/GlobalStyles";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";
import { ROUTES } from "../../../storage/Routes";

const ResultHeader = ({
                        navigation,
                        dashboardProps,
                      }) => {
  const isDarkMode = useColorScheme() === "dark";

  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = dashboardProps;

  const onPressLeft = () => {
    navigation.navigate(ROUTES.HISTORY_SCREEN)
  }

  const onPressRight = () => {
    setMasterData([])
  }

  return (
    <CustomView style={[styles.headerTitleContainer,
      isDarkMode ? { backgroundColor: GlobalColors.grey } : {},
    ]}>
      <TouchableOpacity style={styles.headerLeftButton} onPress={onPressLeft}>
        <Icon
          type={IconRoutes.AntDesign}
          name={"left"}
          size={24}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>


      <CustomText style={styles.headerTitleText} supportDarkMode bold large>
        Checkout
      </CustomText>

      <TouchableOpacity style={styles.headerRightButton} onLongPress={onPressRight}>
        <Icon
          type={IconRoutes.Feather}
          name={"refresh-ccw"}
          size={24}
          style={{ color: GlobalColors.pink2 }}
        />
      </TouchableOpacity>
    </CustomView>
  );
};

export default ResultHeader;
