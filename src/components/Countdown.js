import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {fontSizes, spacing} from '../utils/sizes';

const minutsToMillis = min => min * 60 * 1000;
const formateTime = time => (time < 10 ? `0${time}` : time);

export const Countdown = ({minutes = 0.1, isPaused, onProgress, onEnd}) => {
  const [millis, setMillis] = useState(null);
  const interval = useRef(null);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const countDown = () => {
    setMillis(time => {
      if (time === 0) {
        clearInterval(interval.current);
        // onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      // onProgress(timeLeft / minutsToMillis(minutes));
      return timeLeft;
    });
  };

  useEffect(() => {
    onProgress(millis / minutsToMillis(minutes));

    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutsToMillis(minutes));
  }, [minutes]);

  const minuts = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formateTime(minuts)}:{formateTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.md,
    backgroundColor: 'rgba(94,132,226,0.3)',
    textAlign: 'center',
  },
});
