import React from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { publicRoutes } from './routes.js'
import Header from './components/Header.jsx'
import PNotFound from './pages/PNotFound.jsx'

const App = () => {
    return (
        <BrowserRouter>
        <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
                {publicRoutes.map(({ path, Component, redirectTo }) => (
                    <Route key={path} path={path} element={
                        redirectTo
                            ? (<Navigate replace to={redirectTo} />)
                            : (<Component />)
                    } />
                ))}
                <Route path="*" element={<PNotFound />} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App