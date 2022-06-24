import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { globalColors } from '../../../assets/styles/global';
import styles from './styles';

const Loading = ({ loading, style }) => {
  if (!loading) {
    return <View />;
  }

  return (
    <View style={[styles.overlay, style]}>
      <View style={styles.container}>
        <ActivityIndicator color={globalColors.carsten_green} />
      </View>
    </View>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
  style: PropTypes.object,
};

export default Loading;
