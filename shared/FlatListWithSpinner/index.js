import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  FlatList, Platform,
  RefreshControl,
  StyleSheet, Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlobalColors as GlobalColors } from '../GlobalStyles';

const FlatListWithSpinner = ({
  loading,
  data,
  renderItem,
  onRefresh,
  emptyText,
  bgColor,
  renderFooter,
  fetchMoreData,
  ref,
}) => {
  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>{emptyText}</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text style={styles.emptyListRefresh}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View>
            <ActivityIndicator
              size='large'
              color={GlobalColors.pink1}
            />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={ListEmptyComponent}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData}
            ref={ref}
          />
        </View>
      )}
    </View>
  );
};

FlatListWithSpinner.propTypes = {
  data: PropTypes.array,
  onRefresh: PropTypes.func,
  loading: PropTypes.bool,
  keyExtractor: PropTypes.string,
  renderItem: PropTypes.func,
  emptyText: PropTypes.string,
  bgColor: PropTypes.string,
  renderFooter: PropTypes.func,
  fetchMoreData: PropTypes.func,
  ref: PropTypes.func,
};

FlatListWithSpinner.defaultProps = {
  data: [],
  onRefresh: () => {},
  loading: true,
  keyExtractor: '',
  bgColor: GlobalColors.background_color,
  renderFooter: null,
  fetchMoreData: null,
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    color: GlobalColors.light_black,
  },
  errorText: {
    color: GlobalColors.light_black,
    textAlign: 'center',
  },
  emptyListRefresh: {
    color: GlobalColors.pink3,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    paddingTop: 4,
    paddingBottom: 10,
    paddingHorizontal: 70,
  },
});

export default FlatListWithSpinner;
