import React, { useState } from 'react';
import AppContext from './AppContext.js';

function AppProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('user-data'));

  return (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AppContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
