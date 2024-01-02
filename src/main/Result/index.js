import React from 'react';
import ResultHeader from './ResultHeader';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import ResultScreen from './ResultScreen';

const Result = ({navigation, dashboardProps}) => {

  return (
    <SafeAreaView style={{flex: 1,}}>
      <ResultHeader
        navigation={navigation}
        dashboardProps={dashboardProps}
      />
      <ResultScreen
        dashboardProps={dashboardProps}
      />
    </SafeAreaView>
  )
}

export default Result
