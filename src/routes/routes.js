import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../pages/HomePage/HomePage';
import FormNewMatch from '../pages/Form/Form';
import Match from '../pages/Match/Match';
import ConsultMatches from '../pages/ConsultMatches/ConsultMatches';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="FormNewMatch"
        component={FormNewMatch}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Match"
        component={Match}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="ConsultMatches"
        component={ConsultMatches}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Routes;