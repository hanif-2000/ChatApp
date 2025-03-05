import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaView } from 'react-native';

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={{flex:1}}>
    <AppNavigator />
    </SafeAreaView>
  </Provider>
);

export default App;
