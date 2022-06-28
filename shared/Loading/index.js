import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { GlobalColors } from "../GlobalStyles";

const Loading = ({ loading, style }) => {
  if (!loading) {
    return <View />;
  }

  return (
    <View style={[styles.overlay, style]}>
      <View style={styles.container}>
        <ActivityIndicator color={GlobalColors.pink1} />
      </View>
    </View>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
};

export default Loading;
