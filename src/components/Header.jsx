import { Navbar, Container, Button } from 'react-bootstrap'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/app/AppContext.js';

const Header = () => {
    const navigate = useNavigate();
    const { setIsAuthorized, isAuthorized } = useContext(AppContext)

    const signUp = () => {
        localStorage.removeItem('user-data')
        navigate('/')
        setIsAuthorized(false)
    }

    return (
        <Navbar className="shadow-sm bg-white" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                {isAuthorized && <Button onClick={signUp} variant="primary">Выйти</Button>}
            </Container>
        </Navbar>
    )
}

export default Header