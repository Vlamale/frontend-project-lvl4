import { Navbar, Container, Button } from 'react-bootstrap'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/app/AppContext.js';
import { useTranslation } from 'react-i18next'
import routesPath from '../consts/routesPath.js';

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthorized, isAuthorized } = useContext(AppContext)
    const { t } = useTranslation()

    const logOut = () => {
        localStorage.removeItem('user-data')
        navigate(routesPath.main)
        setIsAuthorized(false)
    }

    return (
        <Navbar className="shadow-sm bg-white" bg="light" variant="light">
            <Container>
                <Navbar.Brand href={routesPath.main}>{t('header.title')}</Navbar.Brand>
                {isAuthorized && <Button onClick={logOut} variant="primary">{t('header.logOut')}</Button>}
            </Container>
        </Navbar>
    )
}

export default Header