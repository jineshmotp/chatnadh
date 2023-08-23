import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import initializeStore from './store'; // Import the modified initializeStore function
import Router from './src/Router';

const App: React.FC = () => {
  const [resolvedStore, setResolvedStore] = useState(null);

  useEffect(() => {
    const resolveStore = async () => {
      const storeInstance = await initializeStore();
      setResolvedStore(storeInstance);
    };

    resolveStore();
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
