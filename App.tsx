import React, { FC } from 'react';
import Router from './src/Router';
import { Provider } from 'react-redux'; // Import the Provider
import store from './store'; // Import the store from the root

const App: FC = () => {
  return (
    <Provider store={store}>
   <Router />
   </Provider>
  );
};

export default App;
