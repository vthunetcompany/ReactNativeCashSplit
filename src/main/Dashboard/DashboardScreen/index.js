import React from "react";
import DashboardComponent from "./DashboardComponent";
import PropTypes from "prop-types";
import DashboardOverviewComponent from "../DashboardOverviewComponent";

const DashboardScreen = ({ dashboardProps }) => {

  return (
    <>
      <DashboardOverviewComponent props={dashboardProps} />
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
