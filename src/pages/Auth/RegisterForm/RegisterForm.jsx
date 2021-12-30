import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../components/form-control/Input-field/InputField';
import PasswordField from '../../../components/form-control/Password-field/PasswordField';
import SelectField from '../../../components/form-control/Select-field/SelectField';
import Rectangle from '../../../components/Rectangle/Rectangle';
import './RegisterForm.scss';
RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};

function RegisterForm(props) {
    const schema = yup.object({

        firstName: yup
            .string()
            .required('Missing firstname!!!'),
        lastName: yup
            .string()
            .required('Missing lastname!!!'),
        email: yup
            .string()
            .required('Please enter your email!!!')
            .email('Wrong email type😭😭😭!!!'),

        password: yup
            .string()
            .required('Please enter your password!!!')
            .min(6, 'Please enter at least 6 characters',),

        retypepassword: yup
            .string()
            .required('Please enter your password!!!')
            .oneOf([yup.ref('password')], 'Password does not match'),
        langCode: yup
            .string()
            .required('Please enter your country!!!'),



    });
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            retypepassword: '',
            langCode: ''
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
                <p className="register-form__title">Enter Your Account Detail</p>
                <p className="register-form__detail">Enter your account detail and a strong password to secure your account</p>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="form">
                    <div className="group-input">
                        <div className="group-input--fname">
                            <InputField name='firstName' label='First name' form={form} />
                        </div>
                        <div className="group-input--lname">
                            <InputField name='lastName' label='Last name' form={form} />
                        </div>
                    </div>
                    <InputField name='email' label='Email' form={form} />
                    <PasswordField name='password' label='Password' form={form} />
                    <PasswordField name='retypepassword' label='Retype password' form={form} />

                    <SelectField name='langCode' label='Country' form={form}/>
                    <button type='submit'>Create an account</button>
                </form>
            </div>
        </>
    );
}

export default RegisterForm;