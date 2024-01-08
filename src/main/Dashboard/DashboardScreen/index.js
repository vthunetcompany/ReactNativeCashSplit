import React, { useState } from 'react';
import DashboardComponent from './DashboardComponent';
import PropTypes from 'prop-types';
import DashboardOverviewComponent from '../DashboardOverviewComponent';
import { useToggle } from '../../../../shared/hooks/useToggle';
import AppModal from '../../../../shared/AppModal';
import ExpenseModalComponent from '../ExpenseModalComponent';
import EditNameModalComponent from '../EditNameModalComponent';
import { capitalizeEachWord } from '../../../../shared/Helpers';

const modalInfoInitialState = {
  id: '',
  name: '',
  amount: ''
}

const DashboardScreen = ({ dashboardProps }) => {
  const [isShowExpenseModal, setIsShowExpenseModal] = useToggle(false);
  const [isShowNameModal, setIsShowNameModal] = useToggle(false);
  const [modalInfo, setModalInfo] = useState(modalInfoInitialState);
  const [listIndex, setListIndex] = useState(0)

  const modalProp = {
    isShowExpenseModal,
    setIsShowExpenseModal,
    modalInfo,
    setModalInfo,

    isShowNameModal,
    setIsShowNameModal,
    listIndex,
    setListIndex,
  };

  return (
    <>
      <DashboardOverviewComponent props={dashboardProps} />
      <DashboardComponent
        props={dashboardProps}
        modalProp={modalProp}
      />

      <AppModal
        title={capitalizeEachWord(modalInfo.name)}
        modalBody={
          <ExpenseModalComponent
            masterDataProp={dashboardProps}
            modalProp={modalProp}
          />
        }
        modalVisible={isShowExpenseModal}
        modalFooter={<></>}
        setModalVisible={setIsShowExpenseModal}
        showExitIcon />

      <AppModal
        title={'Edit name'}
        modalBody={
          <EditNameModalComponent
            masterDataProp={dashboardProps}
            modalProp={modalProp}
          />
        }
        modalVisible={isShowNameModal}
        modalFooter={<></>}
        setModalVisible={setIsShowNameModal}
        showExitIcon
      />
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
