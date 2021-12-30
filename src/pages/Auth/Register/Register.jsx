import React from 'react';
import PropTypes from 'prop-types';
import './Register.scss'
import RegisterForm from '../RegisterForm/RegisterForm';
import { useDispatch } from 'react-redux';
import { register } from '../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
Register.propTypes = {

};

function Register(props) {
    const { enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch()
    const history = useHistory();
    const handleSubmit = async(values) => {
        console.log(values)
        try {
            const action = register(values)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)
            enqueueSnackbar('Đăng ký thành công',{variant :'success',autoHideDuration: 3000,})
            history.push('/')
        } catch (error) {
            enqueueSnackbar(error.message,{variant :'error',autoHideDuration: 3000,})
            // console.log('failed to register', error.message)
        }
    }
    return (
        <RegisterForm onSubmit={handleSubmit}/>
    );
}

export default Register;