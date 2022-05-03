import React from 'react';
import {
  Card, Row, Col, Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginImage from '../img/loginImage.jpeg';
import SignInForm from '../components/auth/SignInForm.jsx';
import routesPath from '../consts/routesPath.js';

function SignInPage() {
  const { t } = useTranslation();

  return (
    <div className="container-fluid h-100">
      <Row className="row justify-content-center align-content-center h-100">
        <Card className="col-12 col-md-7 col-xxl-6 p-0 shadow-sm">
          <Card.Body className="row p-5">

            <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center" xs={12} md={6}>
              <Image roundedCircle src={loginImage} />
            </Col>

            <SignInForm />

          </Card.Body>
          <Card.Footer className="text-center p-4">
            <span>{t('signIn.footer.text')}</span>
            <Link to={routesPath.signUp}>
              {' '}
              {t('signIn.footer.linkText')}
            </Link>
          </Card.Footer>
        </Card>
      </Row>
    </div>
  );
}

export default SignInPage;
