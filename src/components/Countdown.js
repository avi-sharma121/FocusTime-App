import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {colors} from '../utils/colors';
import {fontSizes, spacing} from '../utils/sizes';

const minutsToMillis = min => min * 60 * 1000;

export const Countdown = ({minutes = 20, isPaused}) => {
  return <Text style={styles.text}>Count down goes here..</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.xl,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
