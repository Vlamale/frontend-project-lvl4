import React from 'react';
import AppContext from '../context/app/AppContext.js';

const useAppContext = () => React.useContext(AppContext);

export default useAppContext;
