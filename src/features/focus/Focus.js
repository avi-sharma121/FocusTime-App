import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {RoundedButton} from '../../components/RoundedButton';
import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
export const Focus = ({addSubject}) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>what would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onSubmitEditing={({nativeEvent}) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(subject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: spacing.md,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
    borderRadius: spacing.md,
  },
});
