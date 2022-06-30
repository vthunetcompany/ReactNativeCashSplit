import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import CustomView from "../../../../shared/Components/CustomView";
import { CURRENCY, MONEY_INCREMENT_LEVEL } from "../../../../shared/GlobalConstants";
import { convertPrice, isEmpty } from "../../../../shared/Helpers";
import Icon from "../../../../shared/Icon";
import { IconRoutes } from "../../../../shared/Icon/IconRoutes";
import { GlobalColors } from "../../../../shared/GlobalStyles";
import { useToggle } from "../../../../shared/hooks/useToggle";

const ResultScreen = ({
                        dashboardProps,
                      }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = dashboardProps;
  const [calculateLoading, setCalculateLoading] = useToggle(true)

  const AVG = masterData.reduce((p, c) => p + c.amount, 0) / masterData.length;
  const numberOfChecks = Math.ceil(masterData.length / 2);

  const [transactionHistory, setTransactionHistory] = useState([]);
  const [groupedTransactionHistory, setGroupedTransactionHistory] = useState([]);

  let transaction = [];
  let currentSpendBalance = [];

  const calculateTransactions = () => {
    console.log("currentBalance", currentSpendBalance);

    let differenceBalance = [];
    masterData.forEach(datum => differenceBalance.push(Math.floor(datum.amount - AVG)));
    console.log("differenceBalance", differenceBalance);

    for (let i = 0; i < numberOfChecks; i++) {
      // start from first person, end at half the list
      while (differenceBalance[i] > 0) {
        for (let j = differenceBalance.length - 1; j > i; j--) {
          setTimeout(() => {},1000)
          if (differenceBalance[i] === 0) break

          // start from the last person, end at the current person "i"
          console.log('Current:', i, j);
          if (differenceBalance[j] < 0) {
            differenceBalance = doTransfer(
              j,
              i,
              Math.min(Math.abs(differenceBalance[i]), Math.abs(differenceBalance[j])),
              differenceBalance,
            );
          }
        }
      }
    }

  };

  const doTransfer = (sender, receiver, amount, statusArray = []) => {
    console.log('doTransfer', sender, receiver, amount, statusArray);
    currentSpendBalance[sender] += amount;
    currentSpendBalance[receiver] -= amount;

    transaction.push({
      sender: masterData[sender],
      receiver: masterData[receiver],
      transferAmount: amount
    });

    if (!!statusArray || !isEmpty(statusArray)) {
      statusArray[sender] += amount;
      statusArray[receiver] -= amount;
      return statusArray;
    }
  };

  useEffect(() => {
    setTransactionHistory([])
    setCalculateLoading(true)

    transaction = [];
    currentSpendBalance = [];

    masterData.forEach(datum => currentSpendBalance.push(datum.amount));
    calculateTransactions();

    setTransactionHistory(transaction);
    setCalculateLoading(false)
  }, [masterData]);

  useEffect(() => {
    const pushToArray = (arr, historyItem) => {
      arr.push({
        sender: historyItem.sender,
        receiverList: [
          {
            receiver: historyItem.receiver,
            transferAmount: historyItem.transferAmount
          }
        ],
      })
    }

    if (!!transactionHistory) {
      let arr = []
      transactionHistory.forEach(historyItem => {
        if (isEmpty(arr)) {
          pushToArray(arr, historyItem)
        } else {
          let isSenderExist = false
          arr.forEach(arrItem => {
            if (isSenderExist) return

            if (historyItem.sender.id === arrItem.sender.id) {
              isSenderExist = true

              arrItem.receiverList.push({
                receiver: historyItem.receiver,
                transferAmount: historyItem.transferAmount,
              })
            }
          })

          if (!isSenderExist) {
            pushToArray(arr, historyItem);
          }
        }
      })

      console.log("arr", JSON.stringify(arr));
      setGroupedTransactionHistory(arr);
    }
  }, [transactionHistory])

  const getGroupedSection = (item, index) => {
    return (
      <CustomView style={styles.sectionViewContainer}>
        <CustomView style={styles.leftCol}>
          <CustomText large bold>
            {item.sender.name}
          </CustomText>
        </CustomView>

        <CustomView style={styles.midAndRightContainer}>
          {item.receiverList.map((item, index) =>
            renderGroupedReceiver(item, index)
          )}
        </CustomView>
      </CustomView>
    );
  };

  const renderGroupedReceiver = (item, index) => {
    return (
      <CustomView style={styles.midAndRightRowContainer}>
        <CustomView style={styles.midCol}>
          <CustomView style={styles.midColIcons}>
            <Icon
              type={IconRoutes.Ionicon}
              name={"send"}
              size={15}
              style={{ color: GlobalColors.darkPink1, marginRight: 3 }}
            />
            <Icon
              type={IconRoutes.FAIcon}
              name={"money"}
              size={18}
              style={{ color: GlobalColors.darkPink3 }}
            />
          </CustomView>

          <CustomView style={styles.midColAmountContainer}>
            <CustomText bold>
              {convertPrice(Math.ceil(item.transferAmount / MONEY_INCREMENT_LEVEL) * MONEY_INCREMENT_LEVEL)}{CURRENCY}
            </CustomText>
          </CustomView>
        </CustomView>

        <CustomView style={styles.rightCol}>
          <CustomText large bold style={styles.rightColText}>
            {item.receiver.name}
          </CustomText>
        </CustomView>
      </CustomView>
    );
  };

  return (
    <CustomView style={styles.container}>
      <CustomView style={styles.scrollViewHeader}>
        <CustomText bold large style={styles.leftColHeader}>
          Sender
        </CustomText>
        <CustomText bold large style={styles.midColHeader}>

        </CustomText>
        <CustomText bold large style={styles.rightColHeader}>
          Receiver
        </CustomText>
      </CustomView>

      <ScrollView style={styles.resultScrollContainer}>
        <CustomView style={styles.resultViewContainer}>
          {!calculateLoading && groupedTransactionHistory.map((i1, i2) => getGroupedSection(i1, i2))}
        </CustomView>
      </ScrollView>
    </CustomView>
  );
};

export default ResultScreen;
