import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';
import {Focus} from './src/features/focus/Focus';
import {colors, darkBlue} from './src/utils/colors';
import {Timer} from './src/features/timer/Timer';
import {spacing} from './src/utils/sizes';

const App = () => {
  const [focusSubject, setFocusSubject] = useState('gardening');
  return (
    <>
      <View style={styles.container}>
        {focusSubject ? (
          <Timer focusSubject={focusSubject} />
        ) : (
          <Focus addSubject={setFocusSubject} />
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
