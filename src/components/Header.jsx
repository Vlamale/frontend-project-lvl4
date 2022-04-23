import {Navbar, Container, Nav} from 'react-bootstrap'
import React from 'react'

const Header = () => {
    return (
        <Navbar className="shadow-sm bg-white" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Header