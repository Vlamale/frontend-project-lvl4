import React from 'react';
import {
  Card, Row, Col, Image,
} from 'react-bootstrap';
import signUpImage from '../img/signUpImage.jpg';
import SignUpForm from '../components/auth/SignUpForm.jsx';

function SignUpPage() {
  return (
    <div className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Card className="col-12 col-md-7 col-xxl-6 p-0 shadow-sm">
          <Card.Body className="row p-5">

            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center" xs={12} md={6}>
              <Image src={signUpImage} roundedCircle />
            </Col>

            <SignUpForm />

          </Card.Body>
        </Card>
      </Row>
    </div>
  );
}

export default SignUpPage;
