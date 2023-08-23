// ./store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Import redux-thunk middleware
import {
  userLoginReducer,
  userRegisterReducer,
} from './src/redux-reducer/userReducer';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
  // other reducers...
});

// Load initial state from AsyncStorage
const loadInitialState = async () => {
  try {
    const storedState = await AsyncStorage.getItem('reduxState');
    return JSON.parse(storedState) || {}; // Return parsed JSON or empty object
  } catch (error) {
    console.error('Error loading state from AsyncStorage:', error);
    return {}; // Return empty object in case of error
  }
};

// Save state to AsyncStorage whenever the store state changes
const saveStateToStorage = (state) => {
  try {
    AsyncStorage.setItem('reduxState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state to AsyncStorage:', error);
  }
};

// Load initial state before creating the store
const storePromise = loadInitialState().then(initialState => {
  const store = createStore(
    rootReducer,
    initialState, // Provide the initial state
    applyMiddleware(thunk) // Apply redux-thunk middleware
  );

  // Subscribe to store changes and save state to AsyncStorage
  store.subscribe(() => {
    const state = store.getState();
    saveStateToStorage(state);
  });

  return store; // Return the store from the promise
});

export default storePromise;
