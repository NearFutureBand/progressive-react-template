import React, {useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';

import {TextField, Button} from '@components/index';
import {getPhone} from '@selectors/index';
import {verifySmsCode} from '@redux/actions';

import styles from './styles';

const Verification = () => {
  const dispatch = useDispatch();
  const phone = useSelector(getPhone);
  const [code, setCode] = useState('');

  const onCodeSubmit = useCallback(() => {
    dispatch(verifySmsCode({phone, smsCode: code}));
  }, [code, dispatch, phone]);

  return (
    <View style={styles.container}>
      <Text>{phone}</Text>
      <TextField
        value={code}
        onChangeText={text => setCode(text)}
        label="Code from sms"
        keyboardType="number-pad"
      />
      <Button label="verify" onPress={onCodeSubmit} />
    </View>
  );
};

export default Verification;
