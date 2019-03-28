/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, StatusBar, Text, View, AsyncStorage} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import web3 from './ethereum/web3';

// redux
import { 
  combineReducers, 
  persistCombineReducers,
  createStore, applyMiddleware, routerMiddleware 
} from 'redux';

import { Provider, connect } from 'react-redux';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, autoRehydrate } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import thunk from 'redux-thunk';
//import FilesystemStorage from 'redux-persist-filesystem-storage'
import { createLogger } from 'redux-logger';

import settingReducer from './src/reducers/SettingReducer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component {

  componentWillMount() {
    this.web3  = web3;
    this.web3.eth.getBlock('latest').then(console.log).catch(console.log);
    this.web3.eth.getAccounts(function(error,res) {
      if(!error) {
        console.log(res);
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      // <View style={styles.container}>
      //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// const actionData = MainTabNavigator.router.getActionForPathAndParams('Home');
// const initialState = MainTabNavigator.router.getStateForAction(actionData);

export const navReducer = (state, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
  setting: settingReducer,
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  setting: state.setting,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const middlewares = [];
let store;

if (__DEV__) {
  middlewares.push(createLogger());
  store = createStore(
    appReducer,
    undefined,
    applyMiddleware(...middlewares),
  );
} else {
  store = createStore(appReducer, applyMiddleware(thunk));
}

const rootPersistConfig = {
  key: 'root',
  storage: storage,
}
// const persistor = persistReducer(rootPersistConfig, appReducer);
// const persistor =  persistStore(store, {storage: AsyncStorage});
const persistor = persistStore( store, null, () => {
  // if you want to get restoredState
  //console.log("restoredState", store.getState());
});

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  };
};


export default Root;