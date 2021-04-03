import React from 'react';
import {View, StyleSheet, FlatList, Text, SafeAreaView} from 'react-native';

import {fontSizes, spacing} from '../../utils/sizes';

import {RoundedButton} from '../../components/RoundedButton';

function FocusHistory({focusHistory, onClear}) {
  const HistoryItem = ({item, index}) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
  };
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{flex: 2.5, alignItems: 'center'}}>
        <View>
          <Text style={styles.title}>Things we've focus on</Text>
          {!!focusHistory.length && (
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{flex: 1, alignItems: 'center'}}
              data={focusHistory}
              keyExtractor={item => item.subject}
              renderItem={HistoryItem}
            />
          )}
        </View>
      </SafeAreaView>
      <View style={styles.clearContainer}>
        <RoundedButton size={75} title="Clear" onPress={onClear()} />
      </View>
    </>
  );
}

export default FocusHistory;

const styles = StyleSheet.create({
  historyItem: status => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md,
    margin: 5,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  clearContainer: {
    alignItems: 'center',
    paddingBottom: spacing.xxl,
  },
});
