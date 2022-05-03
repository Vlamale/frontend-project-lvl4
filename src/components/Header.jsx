import { Navbar, Container, Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppContext from '../context/app/AppContext.js';
import routesPath from '../consts/routesPath.js';

function Header() {
  const navigate = useNavigate();
  const { setIsAuthorized, isAuthorized } = useContext(AppContext);
  const { t } = useTranslation();

  const logOut = () => {
    localStorage.removeItem('user-data');
    navigate(routesPath.main);
    setIsAuthorized(false);
  };

  return (
    <Navbar className="shadow-sm bg-white" bg="light" variant="light">
      <Container>
        <Link className="navbar-brand" to={routesPath.main}>{t('header.title')}</Link>
        {isAuthorized && <Button variant="primary" onClick={logOut}>{t('header.logOut')}</Button>}
      </Container>
    </Navbar>
  );
}

export default Header;
