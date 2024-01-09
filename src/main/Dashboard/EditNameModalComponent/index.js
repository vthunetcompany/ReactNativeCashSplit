import React, { useEffect, useState } from 'react';
import CustomView from '../../../../shared/Components/CustomView';
import styles from './styles';
import { convertPrice, customReplaceAll, isEmpty, removeItemFromArray } from '../../../../shared/Helpers';
import { CURRENCY, THOUSAND_SEPARATOR } from '../../../../shared/GlobalConstants';
import CustomText from '../../../../shared/Components/CustomText';
import Input from '../../../../shared/Input';
import { TouchableOpacity } from 'react-native';
import { GlobalColors } from '../../../../shared/GlobalStyles';
import Icon from '../../../../shared/Icon';
import { IconRoutes } from '../../../../shared/Icon/IconRoutes';

const modalInfoInitialState = {
  id: '',
  name: '',
  amount: '',
};

const EditNameModalComponent = ({
                                  modalProp,
                                  masterDataProp,
                                }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = masterDataProp;

  const {
    isShowExpenseModal,
    setIsShowExpenseModal,
    modalInfo,
    setModalInfo,
    isShowNameModal,
    setIsShowNameModal,
    listIndex,
    setListIndex,
  } = modalProp;

  const [inputValue, setInputValue] = useState(modalInfo.name);
  const [currentPersonInMasterData, setCurrentPersonInMasterData] = useState(modalInfoInitialState)

  useEffect(() => {
    const clonedMasterData = Object.assign([], masterData)
    const currentPersonInMasterData = clonedMasterData.find(ele => ele.id === modalInfo.id)

    setCurrentPersonInMasterData(currentPersonInMasterData)
  }, [])

  const onCancel = () => {
    setIsShowNameModal(false)
  }

  const clearName = () => {
    setInputValue('')
  }

  const removePerson = index => {
    const clonedMasterData = Object.assign([], masterData)
    clonedMasterData.splice(index, 1);

    setMasterData(clonedMasterData)
    setIsShowNameModal(false)
  }

  const onSubmit = () => {
    if (!!inputValue && !isEmpty(inputValue.toString().trim()) &&
      inputValue.toString().trim() !== currentPersonInMasterData?.name) {
      console.log('currentPersonInMasterData', masterData);
      const clonedMasterData = Object.assign([], masterData)
      removeItemFromArray(clonedMasterData, currentPersonInMasterData)

      console.log('currentPersonInMasterData', clonedMasterData);

      clonedMasterData.push({
        id: modalInfo.id,
        amount: modalInfo.amount,
        name: inputValue.toString().trim(),
      })
      setMasterData(clonedMasterData.sort((a, b) => b.amount - a.amount))
    }

    setIsShowNameModal(false)
  }

  return (
    <CustomView style={styles.editNameModalContainer}>
      <CustomView>
        <Input
          value={inputValue}
          onChangeText={text => {
            setInputValue(text);
          }}
          onSubmitEditing={onSubmit}
          textAlign='center'
          placeholder={modalInfo.name}
          returnKeyType={'done'}
          maxLength={25}
          icon={
            <TouchableOpacity
              hitSlop={{ top: 10, left: 0, bottom: 15, right: 15 }}
              onPress={clearName}
            >
              <Icon
                type={IconRoutes.Ionicon}
                name={'close-circle'}
                size={20}
                style={{ color: GlobalColors.disabled }}
              />
            </TouchableOpacity>
          }
          iconPosition='right'
          selectTextOnFocus
        />
      </CustomView>

      <CustomView style={styles.modalButtonsContainer}>
        <TouchableOpacity
          style={styles.leftButton}
          onPress={() => {
            removePerson(listIndex)
          }}
        >
          <CustomText bold color={GlobalColors.pure_red}>REMOVE</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rightButton}
          onPress={onSubmit}
        >
          <CustomText bold color={GlobalColors.white}>EDIT</CustomText>
        </TouchableOpacity>
      </CustomView>
    </CustomView>
  );
};

export default EditNameModalComponent;
