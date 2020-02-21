import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

const Button = ({label, containerStyle, ...props}) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} {...props}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export {Button};
