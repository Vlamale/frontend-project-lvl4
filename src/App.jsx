import React, { useEffect, useContext, useState } from 'react'
import {useSelector} from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppContext from './context/app/AppContext.js'
import { authRoutes, publicRoutes } from './consts/routes.js'
import Header from './components/Header.jsx'
import PNotFound from './pages/notFoundPage.jsx'
import Modal from './components/modals/index.js'

const getCurrentRoutes = (isAuthorized) => isAuthorized ? authRoutes : publicRoutes

const App = () => {
    const { isAuthorized } = useContext(AppContext)
    const {type, isOpened} = useSelector(state => state.modal)
    const [routes, setRoutes] = useState(getCurrentRoutes(isAuthorized))

    useEffect(() => {
        setRoutes(getCurrentRoutes(isAuthorized))
    }, [isAuthorized])

    return (
        <>
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
            {isOpened && Modal(type)}
        </>
    )
}

export default App