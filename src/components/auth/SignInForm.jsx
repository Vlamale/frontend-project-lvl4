import React from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { publicHost } from '../../http/index.js';
import routesPath from '../../consts/routesPath.js';
import { notifyError } from '../../notify.js';
import useAppContext from '../../hooks/useAppContext.js';

const signInSchema = object({
  userName: string().required(),
  userPassword: string().required(),
});

function SignInForm() {
  const { t } = useTranslation();
  const { setIsAuthorized } = useAppContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      userPassword: '',
    },
    validationSchema: signInSchema,
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
        setFieldError('userPassword', t('formErrors.incorrectUserData'));
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
          value={formik.values.userName}
          isInvalid={!!formik.errors.userName}
          onChange={formik.handleChange}
        />
      </FloatingLabel>

      <FloatingLabel controlId="userPassword" label={t('signIn.passwordPlaceholder')}>
        <Form.Control
          required
          className="mb-4"
          type="password"
          name="userPassword"
          placeholder={t('signIn.passwordPlaceholder')}
          value={formik.values.userPassword}
          isInvalid={!!formik.errors.userPassword}
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.userPassword}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Button type="submit" className="mb-3 w-100" variant="outline-primary">{t('signIn.submitBtn')}</Button>
    </Form>
  );
}

export default SignInForm;
