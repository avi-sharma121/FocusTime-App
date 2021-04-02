import React, {useState} from 'react';
import {View, Text, StyleSheet, Vibration, Platform} from 'react-native';
import {Countdown} from '../../components/Countdown';
import {colors} from '../../utils/colors';
import {spacing} from '../../utils/sizes';
import {RoundedButton} from '../../components/RoundedButton';
import * as Progress from 'react-native-progress';
import Timing from '../timer/Timing';
import KeepAwake from 'react-native-keep-awake';

const DEFAULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd}) => {
  <KeepAwake />;
  const [isStarted, setIsStarted] = useState(false);
  const [progresss, setProgrress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const onProgress = progress => {
    // console.log(progress);
    setProgrress(progress);
  };

  const changeTime = min => {
    setMinutes(min);
    setProgrress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();
    // console.log('end');
    setMinutes(DEFAULT_TIME);
    setProgrress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          onProgress={onProgress}
          minutes={minutes}
          onEnd={onEnd}
        />
        <View style={{marginTop: 20}}>
          <Progress.Bar
            progress={progresss}
            width={300}
            height={20}
            borderRadius={20}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Timing onChangeTime={changeTime} />
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
    marginTop: 10,
    flex: 0.3,
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
