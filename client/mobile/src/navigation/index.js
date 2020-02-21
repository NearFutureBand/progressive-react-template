import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Registration from '@screens/Registration';
import Verification from '@screens/Verification';

const AuthStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Registration" component={Registration} />
      <AuthStack.Screen name="Verification" component={Verification} />
    </AuthStack.Navigator>
  );
};

export default AppNavigator;
