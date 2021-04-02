import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Countdown} from '../../components/Countdown';
import {colors} from '../../utils/colors';
import {spacing} from '../../utils/sizes';
import {RoundedButton} from '../../components/RoundedButton';
import * as Progress from 'react-native-progress';

export const Timer = ({focusSubject}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progresss, setProgrress] = useState(1);

  const onProgress = progress => {
    // console.log(progress);
    setProgrress(progress);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown isPaused={!isStarted} onProgress={onProgress} />
        <View style={{marginTop: 20}}>
          <Progress.Bar
            progress={progresss}
            width={300}
            height={20}
            borderRadius={20}
          />
        </View>
      </View>
      <View style={{paddingTop: spacing.xxl}}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    justifyContent: 'center',
    flex: 0.5,
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
