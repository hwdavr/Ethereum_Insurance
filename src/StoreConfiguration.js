// redux
import { 
    combineReducers, 
    persistCombineReducers,
    createStore, applyMiddleware, routerMiddleware 
  } from 'redux';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
//import FilesystemStorage from 'redux-persist-filesystem-storage'
import { createLogger } from 'redux-logger';

import settingReducer from './reducers/SettingReducer';
import AppNavigator from './navigation/AppNavigator';


function configureStore(initialState = {}) {
    // const actionData = MainTabNavigator.router.getActionForPathAndParams('Home');
    // const initialState = MainTabNavigator.router.getStateForAction(actionData);

  const navReducer = (state, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
  };
  
  const appReducer = combineReducers({
    nav: navReducer,
    setting: settingReducer,
  });
  
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
  
  return {store, persistor};
}
  
  export default configureStore;
  