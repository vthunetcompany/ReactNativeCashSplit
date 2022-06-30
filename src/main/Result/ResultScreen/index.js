import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styles from "./styles";
import CustomText from "../../../../shared/Components/CustomText";
import CustomView from "../../../../shared/Components/CustomView";
import { CURRENCY } from "../../../../shared/GlobalConstants";
import { isEmpty } from "../../../../shared/Helpers";

const ResultScreen = ({
                        dashboardProps,
                      }) => {
  const {
    isLoading,
    masterData,
    setMasterData,
    loadData,
  } = dashboardProps;

  const AVG = masterData.reduce((p, c) => p + c.amount, 0) / masterData.length;
  const numberOfChecks = Math.ceil(masterData.length / 2);

  const [transactionHistory, setTransactionHistory] = useState([]);

  let transaction = [];
  let currentSpendBalance = [];

  const calculateTransactions = () => {
    console.log("currentBalance", currentSpendBalance);

    let differenceBalance = [];
    masterData.forEach(datum => differenceBalance.push(Math.floor(datum.amount - AVG)));
    console.log("differenceBalance", differenceBalance);  // 625000 -14500 -22500 -25500

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

    transaction.push({ sender, receiver, amount });

    if (!!statusArray || !isEmpty(statusArray)) {
      statusArray[sender] += amount;
      statusArray[receiver] -= amount;
      return statusArray;
    }
  };

  useEffect(() => {
    transaction = [];
    currentSpendBalance = [];

    masterData.forEach(datum => currentSpendBalance.push(datum.amount));

    calculateTransactions();
    console.log("\n-----------------------------------------------\nResult::",
      transaction,
      "\n-----------------------------------------------");
    setTransactionHistory(transaction);
  }, [masterData]);

  const debugPrint = () => {
    return masterData.reduce((prev, curr) => prev + curr.amount.toString().concat(CURRENCY + "\n"), "")
        .concat("Avg: ").concat(AVG).concat(CURRENCY + "\n\n")
        .concat(masterData.reduce((prev, curr) => prev + (curr.amount - AVG).toString().concat(CURRENCY + "\n"), ""))
      + numberOfChecks;
  };


  const getSection = (item, index) => {
    return (
      <CustomView style={styles.sectionViewContainer}>
        <CustomView style={styles.leftCol}>
          <CustomText>{item.sender} gives {item.amount} to {item.receiver}</CustomText>
        </CustomView>
        <CustomView style={styles.rightCol}>
          <CustomText>{item.id}</CustomText>
        </CustomView>
      </CustomView>
    )
  }

  return (
    <ScrollView style={styles.resultScrollContainer}>
      <CustomView style={styles.resultViewContainer}>
        {/*<CustomText>*/}
        {/*  {*/}
        {/*    debugPrint()*/}
        {/*  }*/}
        {/*</CustomText>*/}

        {transactionHistory.map((i1, i2) => getSection(i1, i2))}
      </CustomView>
    </ScrollView>
  );
};

export default ResultScreen;
