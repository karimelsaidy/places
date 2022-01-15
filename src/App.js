import React from 'react';
import type {Node} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './stateStore/store';
import PlacesNav from './Navigation/PlacesNav';
import { initDb } from './helpers/db';
import colors from './assests/colors';


// initialize data base
try{
  initDb();

} catch (e){
  console.log(e)
}

const App: () => Node = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar backgroundColor={colors.third} />
        <PlacesNav />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
