import React, {useState} from 'react';
import {View, Text} from 'react-native';

import {TextField, Button} from '@components/index';

import styles from './style';

const Registration = () => {
  const [phone, setPhone] = useState('+375');

  return (
    <View style={styles.container}>
      <TextField
        value={phone}
        onChangeText={text => setPhone(text)}
        label="Mobile phone number"
        keyboardType="phone-pad"
      />
      <Button label="submit" />
    </View>
  );
};

export default Registration;
