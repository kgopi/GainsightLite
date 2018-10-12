import { createStore, combineReducers } from 'redux';
import {GainsightLiteReducer} from './reducers/GainsightLiteReducer';

const rootReducer = combineReducers({
  app: GainsightLiteReducer
});

export function configureStore() {
  return createStore(rootReducer);
}

export default configureStore();