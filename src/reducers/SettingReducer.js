import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from 'react-native';
import { 
  persistReducer,
  REHYDRATE,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { SETTING_AVAILABLE, SAVE_COUNTER } from "../actions/" //Import the actions types constant we defined in our actions


let dataState = { 
    data: 'df', 
    loading: true,
    count: 0,
};

const settingReducer = (state = dataState, action) => {
  // reducer implementation
  switch (action.type) {
    case REHYDRATE:
        if (action.payload) {
            return {
                ...state,
                ...action.payload,
            };
        } else {
            return state;
        }
    case SETTING_AVAILABLE:
        state = Object.assign({}, state, { 
            data: action.data, 
            loading:false,
            count: action.count
        });
        return state;
    case SAVE_COUNTER:
        state.count = action.count;
        return state;
    default:
        return state;
  }
};

const persistConfig = {
  key: 'setting',
  deubg: true,
  storage: storage,
  stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

export default persistReducer(persistConfig, settingReducer);

