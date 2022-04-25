import React from 'react'
import AppContext from "./AppContext.jsx"
import {useState} from 'react'

const AppProvider = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(!!localStorage.getItem('user-data'))

    return (
        <AppContext.Provider value={{isAuthorized, setIsAuthorized}} >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider