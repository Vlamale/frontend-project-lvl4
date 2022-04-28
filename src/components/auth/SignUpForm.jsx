import React, { useContext, useState } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'
import AppContext from '../../context/app/AppContext.js'
import { publicHost } from '../../http/index.js'
import { useTranslation } from 'react-i18next'
import routesPath from '../../consts/routesPath.js'
import { notifyError } from '../../notify.js'

const SignUpForm = () => {
    const { setIsAuthorized } = useContext(AppContext)
    const [submitFailed, setSubmitFailed] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const authSchema = object({
        userName: string().required(t('formErrors.required')).matches(/^.{3,35}$/, t('formErrors.from3To20')),
        userPassword: string().required(t('formErrors.required')).min(6, t('formErrors.atLeast6')),
        confirmPassword: string().required(t('formErrors.required')).oneOf([ref('userPassword'), null], t('formErrors.passwordsMatch')),
    })

    const formik = useFormik({
        initialValues: {
            userName: '',
            userPassword: '',
            confirmPassword: ''
        },
        validationSchema: authSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                const { data } = await publicHost.post('/signup', {
                    username: values.userName,
                    password: values.userPassword
                })
                localStorage.setItem('user-data', JSON.stringify(data))
                setIsAuthorized(true)
                navigate(routesPath.main, { replace: true })
            } catch (err) {
                notifyError(t('notify.error.connect'))
                setSubmitFailed(true)
                setFieldError('userName', '')
                setFieldError('userPassword', '')
                if (err.response.status == 409) {
                    setFieldError('confirmPassword', t('formErrors.userexists'))
                }
            }
        }
    })

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
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    onBlur={formik.handleBlur}
                    isInvalid={submitFailed || (formik.touched.userName && formik.errors.userName)}
                />
                {formik.touched.userName && formik.errors.userName && (
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.userName}
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
                    onChange={formik.handleChange}
                    value={formik.values.userPassword}
                    onBlur={formik.handleBlur}
                    isInvalid={submitFailed || (formik.touched.userPassword && formik.errors.userPassword)}
                />
                {formik.touched.userPassword && formik.errors.userPassword && (
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.userPassword}
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
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    isInvalid={submitFailed || (formik.touched.confirmPassword && formik.errors.confirmPassword)}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                )}
            </FloatingLabel>



            <Button type="submit" className="mb-3 w-100" variant="outline-primary">{t('signUp.submitBtn')}</Button>
        </Form>
    )
}

export default SignUpForm