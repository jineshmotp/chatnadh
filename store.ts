// store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Import Redux Thunk
import userLoginReducer from './src/redux-reducer/userReducer';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  // other reducers...
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply Redux Thunk middleware

export default store;