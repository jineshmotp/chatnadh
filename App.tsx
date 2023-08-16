import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import storePromise from './store'; // Import the store promise
import Router from './src/Router';

const App: React.FC = () => {
  const [resolvedStore, setResolvedStore] = useState(null);

  useEffect(() => {
    storePromise.then(store => {
      setResolvedStore(store);
    });
  }, []);

  if (!resolvedStore) {
    // Return null or an empty component while the store is being resolved
    return null;
  }

  return (
    <Provider store={resolvedStore}>
      <Router />
    </Provider>
  );
};

export default App;
