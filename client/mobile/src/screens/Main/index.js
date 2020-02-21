import React, {useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {View, Text} from 'react-native';

import {syncAction, asyncAction} from '@redux/actions';

const Registration = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      asyncAction({
        onFailureCallback: () => timeoutAsyncAction(),
      }),
    );
  });

  const timeoutAsyncAction = useCallback(() => {
    setTimeout(() => dispatch(syncAction()), 2000);
  }, [dispatch]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Main screen</Text>
    </View>
  );
};

export default Registration;
