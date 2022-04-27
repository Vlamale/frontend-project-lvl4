import React, { useContext, useState } from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import AppContext from '../../context/app/AppContext.js';
import { publicHost } from '../../http/index.js';

const SignUpForm = () => {
    const { setIsAuthorized } = useContext(AppContext)
    const [submitFailed, setSubmitFailed] = useState(false);
    const navigate = useNavigate()

    const authSchema = object({
        userName: string().required('Обязательное поле').matches(/^.{3,35}$/, 'От 3 до 20 символов'),
        userPassword: string().required('Обязательное поле').min(6, 'Не менее 6 символов'),
        confirmPassword: string().required('Обязательное поле').oneOf([ref('userPassword'), null], 'Пароли должны совпадать'),
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
                navigate('/', { replace: true })
            } catch (err) {
                setSubmitFailed(true)
                setFieldError('userName', '')
                setFieldError('userPassword', '')
                if (err.response.status == 409) {
                    setFieldError('confirmPassword', 'Такой пользователь уже существует')
                }
            }
        }
    })

    return (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0 needs-validation" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Регистрация</h1>

            <FloatingLabel controlId="userName" label="Имя пользователя">
                <Form.Control
                    required
                    className="mb-3"
                    type="text"
                    name="userName"
                    placeholder='Имя пользователя'
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

            <FloatingLabel controlId="userPassword" label="Пароль">
                <Form.Control
                    required
                    className="mb-4"
                    type="password"
                    name="userPassword"
                    placeholder='Пароль'
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

            <FloatingLabel controlId="confirmPassword" label="Подтвердите пароль">
                <Form.Control
                    required
                    className="mb-4"
                    type="password"
                    name="confirmPassword"
                    placeholder='Подтвердите пароль'
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



            <Button type="submit" className="mb-3 w-100" variant="outline-primary">Зарегистрироваться</Button>
        </Form>
    )
}

export default SignUpForm