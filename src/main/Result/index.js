import React from "react";
import ResultHeader from "./ResultHeader";

const Result = ({navigation, dashboardProps}) => {

  return (
    <>
      <ResultHeader
        navigation={navigation}
        dashboardProps={dashboardProps}
      />
    </>
  )
}

export default Result
