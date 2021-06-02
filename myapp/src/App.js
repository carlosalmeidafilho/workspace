{/* IMPORT LIBS */}
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

{/* IMPORT NAVIGATION */}
import MainStack from './stacks/MainStack';

{/* MAIN APP */}
export default () => {
  return (
    <NavigationContainer >
      <StatusBar barStyle="default" hidden={false} backgroundColor="#97D2FB" translucent={false} />
      <MainStack />
    </NavigationContainer>
  );
}