import React from 'react'
import { Form, FloatingLabel, Button } from 'react-bootstrap'
import { useFormik } from 'formik';
import { object, string } from 'yup';

const AuthWindow = () => {
    const authSchema = object({
        userName: string().required(),
        userPassword: string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.')
    })

    const formik = useFormik({
        initialValues: {
            userName: '',
            userPassword: '',
        },
        onSubmit: async (values) => {
            const user = await authSchema.validate(values)
        }
    })

    return (
        <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Войти:</h1>

            <FloatingLabel controlId="userName" label="Ваш ник">
                <Form.Control
                    className="mb-3"
                    type="text"
                    name="userName"
                    placeholder='Ваш ник'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </FloatingLabel>

            <FloatingLabel controlId="userPassword" label="Пароль">
                <Form.Control
                    className="mb-4"
                    type="password"
                    name="userPassword"
                    placeholder='Ваш ник'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </FloatingLabel>

            <Button type="submit" className="mb-3 w-100" variant="outline-primary">Войти</Button>
        </Form>
    )
}

export default AuthWindow