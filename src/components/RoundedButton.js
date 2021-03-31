import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]} onPress={props.onPress}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = size =>
  StyleSheet.create({
    radius: {
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#fff',
      justifyContent: 'center',
    },
    text: {
      color: '#fff',
      fontSize: size / 3,
    },
  });
