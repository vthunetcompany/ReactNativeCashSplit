import React, { useEffect, useState } from "react";
import { useToggle } from "../../../../shared/hooks/useToggle";
import DashboardComponent from "./DashboardComponent";

const DashboardScreen = () => {
  const [isLoading, toggleLoading] = useToggle(true);
  const [data, setData] = useState([])

  useEffect(() => {
    setTimeout(() => {
      toggleLoading();
    }, 1000);
  }, []);


  const dashboardProps = {
    isLoading,
    data,
  };

  return (
    <DashboardComponent props={dashboardProps} />
  );
};

export default DashboardScreen;
