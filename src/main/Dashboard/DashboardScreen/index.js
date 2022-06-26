import React, { useState } from "react";
import DashboardComponent from "./DashboardComponent";
import PropTypes from "prop-types";
import DashboardOverviewComponent from "../DashboardOverviewComponent";
import { useToggle } from "../../../../shared/hooks/useToggle";
import AppModal from "../../../../shared/AppModal";

const modalInfoInitialState = {
  id: '',
  name: '',
  amount: ''
}

const DashboardScreen = ({ dashboardProps }) => {
  const [isShowExpenseModal, setIsShowExpenseModal] = useToggle(false)
  const [modalInfo, setModalInfo] = useState(modalInfoInitialState)
  const modalProp = {
    isShowExpenseModal,
    setIsShowExpenseModal,
    modalInfo,
    setModalInfo,
  }

  return (
    <>
      <DashboardOverviewComponent props={dashboardProps} />
      <DashboardComponent
        props={dashboardProps}
        modalProp={modalProp}
      />
      <AppModal
        title={modalInfo.name}
        modalBody={
          <></>
        }
        modalVisible={isShowExpenseModal}
        modalFooter={<></>}
        setModalVisible={setIsShowExpenseModal}
        showExitIcon/>
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
