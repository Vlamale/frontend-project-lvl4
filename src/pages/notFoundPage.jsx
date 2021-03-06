import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../img/notFoundImg.webp';
import routesPath from '../consts/routesPath.js';

const notFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <Image src={notFoundImg} />
      <h1 className="h4 text-muted">{t('notFoundPage.title')}</h1>
      <p className="text-muted">
        {t('notFoundPage.body.text')}
        <Link to={routesPath.main}>
          {' '}
          {t('notFoundPage.body.link')}
        </Link>
      </p>
    </div>
  );
};

export default notFoundPage;
