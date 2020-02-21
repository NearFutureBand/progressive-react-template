import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';

import {TextField, Button} from '@components/index';
import {changePhone, tryToSignIn} from '@redux/actions';
import {getPhone, getToken} from '@selectors/index';

import styles from './styles';

const Registration = ({navigation}) => {
  const dispatch = useDispatch();
  const phone = useSelector(getPhone);
  const token = useSelector(getToken);

  const onPhoneSubmit = () => {
    dispatch(
      tryToSignIn({
        phone,
        token,
        onFailureCallback: () => navigation.navigate('Verification'),
      }),
    );
  };

  return (
    <View style={styles.container}>
      <TextField
        value={phone}
        onChangeText={text => dispatch(changePhone({phone: text}))}
        label="Mobile phone number"
        keyboardType="phone-pad"
      />
      <Button label="submit" onPress={onPhoneSubmit} />
    </View>
  );
};

export default Registration;
