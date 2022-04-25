import React, { useEffect, useContext, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppContext from './context/app/AppContext.jsx'
import { authRoutes, publicRoutes } from './routes.js'
import Header from './components/Header.jsx'
import PNotFound from './pages/PNotFound.jsx'

const getCurrentRoutes = (isAuthorized) => isAuthorized ? authRoutes : publicRoutes

const App = () => {
    const {isAuthorized} = useContext(AppContext)
    const [routes, setRoutes] = useState(getCurrentRoutes(isAuthorized))

    useEffect(() => {
        setRoutes(getCurrentRoutes(isAuthorized))
    }, [isAuthorized])

    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
                {routes.map(({ path, Component, redirectTo }) => (
                    <Route key={path} path={path} element={
                        redirectTo
                            ? (<Navigate replace to={redirectTo} />)
                            : (<Component />)
                    } />
                ))}
                <Route path="*" element={<PNotFound />} />
            </Routes>
        </div>
    )
}

export default App