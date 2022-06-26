import React from "react";
import DashboardComponent from "./DashboardComponent";
import PropTypes from "prop-types";
import DashboardOverviewComponent from "../DashboardOverviewComponent";
import { useToggle } from "../../../../shared/hooks/useToggle";
import AppModal from "../../../../shared/AppModal";

const DashboardScreen = ({ dashboardProps }) => {
  const [isShowExpenseModal, setIsShowExpenseModal] = useToggle(false)

  return (
    <>
      <DashboardOverviewComponent props={dashboardProps} />
      <DashboardComponent props={dashboardProps} />
      {/*<AppModal />*/}
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
