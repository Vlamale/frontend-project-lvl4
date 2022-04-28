import React, { useContext } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import AppContext from '../../context/app/AppContext.js';
import { publicHost } from '../../http/index.js';
import routesPath from '../../consts/routesPath.js';
import { notifyError } from '../../notify.js';

function SignInForm() {
  const { setIsAuthorized } = useContext(AppContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authSchema = object({
    userName: string().required(),
    userPassword: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      userPassword: '',
    },
    validationSchema: authSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { data } = await publicHost.post('/login', {
          username: values.userName,
          password: values.userPassword,
        });
        localStorage.setItem('user-data', JSON.stringify(data));
        setIsAuthorized(true);
        navigate(routesPath.main, { replace: true });
      } catch (err) {
        notifyError(t('notify.error.connect'));
        setFieldError('userName', 'err');
        setFieldError('userPassword', t('signIn.incorrectUserData'));
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0 needs-validation" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signIn.title')}</h1>

      <FloatingLabel controlId="userName" label={t('signIn.namePlaceholder')}>
        <Form.Control
          required
          className="mb-3"
          type="text"
          name="userName"
          placeholder={t('signIn.namePlaceholder')}
          onChange={formik.handleChange}
          value={formik.values.userName}
          isInvalid={!!formik.errors.userName}
        />
      </FloatingLabel>

      <FloatingLabel controlId="userPassword" label={t('signIn.passwordPlaceholder')}>
        <Form.Control
          required
          className="mb-4"
          type="password"
          name="userPassword"
          placeholder={t('signIn.passwordPlaceholder')}
          onChange={formik.handleChange}
          value={formik.values.userPassword}
          isInvalid={!!formik.errors.userPassword}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.userPassword}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Button type="submit" className="mb-3 w-100" variant="outline-primary">{t('signIn.submitBtn')}</Button>
    </Form>
  );
}

export default SignInForm;
