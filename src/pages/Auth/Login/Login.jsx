import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../userSlice';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
Login.propTypes = {

};

function Login(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const handleSumit = async (values) => {
        try {

            const action = login(values)

            const resultAction = await dispatch(action)
            unwrapResult(resultAction)
            enqueueSnackbar('Login successful',{variant :'success',autoHideDuration: 3000,})
            history.push('/')
        } catch (error) {
            console.log('failed to register', error)
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 1000, })
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleSumit}/>
        </div>
    );
}

export default Login;