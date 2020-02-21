import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '@screens/Main';

const AuthStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Main" component={Main} />
    </AuthStack.Navigator>
  );
};

export default AppNavigator;
