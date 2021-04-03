import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Focus} from './src/features/focus/Focus';
import {colors} from './src/utils/colors';
import {Timer} from './src/features/timer/Timer';
import {spacing} from './src/utils/sizes';
import FocusHistory from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

const App = () => {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  //
  //  useEffect(() => {
  //    if (focusSubject) setFocusHistory([...focusHistory, focusSubject]);
  //  }, [focusSubject]);
  //
  //  console.log(focusHistory);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      console.log(history);
      if (history && JSON.parse(history).length)
        setFocusHistory(JSON.parse(history));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  const onClear = () => {
    setFocusHistory([]);
  };

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status}]);
  };

  //console.log(focusHistory);

  return (
    <>
      <StatusBar backgroundColor={colors.darkBlue} barStyle="light-content" />
      <View style={styles.container}>
        {focusSubject ? (
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={() => {
              addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
              setFocusSubject(null);
            }}
          />
        ) : (
          <>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={() => onClear} />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});

export default App;
