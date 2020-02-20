import React from 'react';
import {View, Text, TextInput} from 'react-native';

import styles from './styles';

const TextField = ({label, value, onChangeText, containerStyle, ...props}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text>{label}</Text>
      {
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          {...props}
        />
      }
    </View>
  );
};

export {TextField};
