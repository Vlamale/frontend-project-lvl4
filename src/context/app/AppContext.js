import { createContext } from 'react'

const AppContext = createContext({
    isAuthorized: false,
    setIsAuthorized: () => {},
});

export default AppContext