import React from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import loginImage from '../img/loginImage.jpeg'
import { Link } from 'react-router-dom';
import AuthForm from '../components/auth/SignInForm.jsx'

const AuthPage = () => {

    return (
        <div className="container-fluid h-100">
            <Row className="row justify-content-center align-content-center h-100">
                <Card className="col-12 col-md-7 col-xxl-6 p-0 shadow-sm">
                    <Card.Body className="row p-5">

                        <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center" xs={12} md={6} >
                            <Image src={loginImage} roundedCircle />
                        </Col>

                        <AuthForm />

                    </Card.Body>
                    <Card.Footer className="text-center p-4">
                        <span>Нет аккаунта?</span> <Link to="/">Регистрация</Link>
                    </Card.Footer>
                </Card>
            </Row>
        </div>
    )
}

export default AuthPage

