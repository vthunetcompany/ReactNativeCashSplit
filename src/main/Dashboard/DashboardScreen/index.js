import React, { useEffect, useState } from "react";
import { useToggle } from "../../../../shared/hooks/useToggle";
import DashboardComponent from "./DashboardComponent";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../../storage/AsyncStorageKeys";
import DashboardOverviewComponent from "../DashboardOverviewComponent";
import { DEBUG_MODE, USE_SAMPLE_DATA } from "../../../../shared/GlobalConstants";
import { isEmpty } from "../../../../shared/Helpers";

const DashboardScreen = ({}) => {
  const [isLoading, toggleLoading] = useToggle(true);
  const [masterData, setMasterData] = useState([]);

  const loadData = async () => {
    return JSON.parse(await AsyncStorage.getItem(AsyncStorageKeys.masterData));
  };

  const saveData = masterData => {
    AsyncStorage.setItem(AsyncStorageKeys.masterData, JSON.stringify(masterData));
  };

  useEffect(() => {
    // set timer loading UI
    if (!DEBUG_MODE) {
      setTimeout(() => {
        toggleLoading(false);
      }, 1000);
    }

    if (USE_SAMPLE_DATA) {
      const setData = () => {
        const sampleData = [
          // { name: "hung vu", amount: 69000 },
          // { name: "alice", amount: 25000 },
          // { name: "xi peso", amount: 1200000 },
          // { name: "johnny walker", amount: 1200000 },
          // { name: "moon peso", amount: 1200000 },
          // { name: "john doe", amount: 1200000 },
          // { name: "vu hung", amount: 1200000 },
          // { name: "george bush", amount: 1200000 },
          // { name: "the queen of england", amount: 1200000 },
        ];

        saveData(sampleData);
      };
      setData();
    }

    // load masterData from local storage on startup
    loadData().then(res => {
      console.log("Startup::", res);
      if (!!res) {
        setMasterData(res);
      }
      toggleLoading(false)
    });
  }, []);

  useEffect(() => {
    if (!!masterData && !isEmpty(masterData)) {
      console.log("masterData changes::", masterData);
      saveData(masterData);
    }
  }, [masterData]);

  const dashboardProps = {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  };

  return (
    <>
      <DashboardOverviewComponent />
      <DashboardComponent props={dashboardProps} />
    </>
  );
};

DashboardScreen.propTypes = {
  masterData: PropTypes.object,
};

DashboardScreen.defaultProps = {
  masterData: {},
};

export default DashboardScreen;
