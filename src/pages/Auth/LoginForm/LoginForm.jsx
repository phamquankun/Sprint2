import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../components/form-control/Input-field/InputField';
import PasswordField from '../../../components/form-control/Password-field/PasswordField';
import SelectField from '../../../components/form-control/Select-field/SelectField';
import Rectangle from '../../../components/Rectangle/Rectangle';

LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};
LoginForm.defaultProps = {
    obSubmit: null,
}
function LoginForm(props) {
    const schema = yup.object({
        email: yup
            .string()
            .required('Please enter your email!!!')
            .email('Wrong email type😭😭😭!!!'),

        password: yup
            .string()
            .required('Please enter your password!!!')
            .min(6, 'Please enter at least 6 characters',),
    });
    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema)
    })
    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if (onSubmit) onSubmit(values)
        // form.reset()
    }
    return (
        <>
            <Rectangle />
            <div className="register-form">
                <p className="register-form__title">Exchange Account Login</p>
                <p className="register-form__detail">Welcome back! Login with your mail</p>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="form">
                    <InputField name='email' label='Email' form={form} />
                    <PasswordField name='password' label='Password' form={form} />
                    <button type='submit'>Login</button>
                </form>
            </div>
        </>
    );
}

export default LoginForm;