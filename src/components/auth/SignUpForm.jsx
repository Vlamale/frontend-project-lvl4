import React, { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import { useTranslation } from 'react-i18next';
import { publicHost } from '../../http/index.js';
import routesPath from '../../consts/routesPath.js';
import { notifyError } from '../../notify.js';
import useAppContext from '../../hooks/useAppContext.js';

const signUpSchema = object({
  userName: string().required('formErrors.required').matches(/^.{3,35}$/, 'formErrors.from3To20'),
  userPassword: string().required('formErrors.required').min(6, 'formErrors.atLeast6'),
  confirmPassword: string()
    .required('formErrors.required')
    .oneOf([ref('userPassword'), null], 'formErrors.passwordsMatch'),
});

function SignUpForm() {
  const { t } = useTranslation();
  const { setIsAuthorized } = useAppContext();
  const [submitFailed, setSubmitFailed] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      userPassword: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { data } = await publicHost.post('/signup', {
          username: values.userName,
          password: values.userPassword,
        });
        localStorage.setItem('user-data', JSON.stringify(data));
        setIsAuthorized(true);
        navigate(routesPath.main, { replace: true });
      } catch (err) {
        notifyError(t('notify.error.connect'));
        setSubmitFailed(true);
        setFieldError('userName', '');
        setFieldError('userPassword', '');
        if (err.response.status === 409) {
          setFieldError('confirmPassword', t('formErrors.userexists'));
        }
      }
    },
  });

  return (
    <Form className="col-12 col-md-6 mt-3 mt-mb-0 needs-validation" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signUp.title')}</h1>

      <FloatingLabel controlId="userName" label={t('signUp.namePlaceholder')}>
        <Form.Control
          required
          className="mb-3"
          type="text"
          name="userName"
          placeholder={t('signUp.namePlaceholder')}
          value={formik.values.userName}
          isInvalid={submitFailed || (formik.touched.userName && formik.errors.userName)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.userName && formik.errors.userName && (
          <Form.Control.Feedback tooltip type="invalid">
            {t(formik.errors.userName)}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      <FloatingLabel controlId="userPassword" label={t('signUp.passwordPlaceholder')}>
        <Form.Control
          required
          className="mb-4"
          type="password"
          name="userPassword"
          placeholder={t('signUp.passwordPlaceholder')}
          value={formik.values.userPassword}
          isInvalid={submitFailed || (formik.touched.userPassword && formik.errors.userPassword)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.userPassword && formik.errors.userPassword && (
          <Form.Control.Feedback tooltip type="invalid">
            {t(formik.errors.userPassword)}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      <FloatingLabel controlId="confirmPassword" label={t('signUp.confirmPasswordPlaceholder')}>
        <Form.Control
          required
          className="mb-4"
          type="password"
          name="confirmPassword"
          placeholder={t('signUp.confirmPasswordPlaceholder')}
          value={formik.values.confirmPassword}
          isInvalid={
            submitFailed || (formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Form.Control.Feedback tooltip type="invalid">
            {t(formik.errors.confirmPassword)}
          </Form.Control.Feedback>
        )}
      </FloatingLabel>

      <Button type="submit" className="mb-3 w-100" variant="outline-primary">{t('signUp.submitBtn')}</Button>
    </Form>
  );
}

export default SignUpForm;
