import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Registration from '@screens/Registration';

const AuthStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Registration" component={Registration} />
    </AuthStack.Navigator>
  );
};

export default AppNavigator;
