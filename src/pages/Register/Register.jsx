import React from 'react';
import PropTypes from 'prop-types';
import Rectangle from '../../components/Rectangle/Rectangle';
import './Register.scss'
Register.propTypes = {

};

function Register(props) {
    return (
        <>
            <Rectangle />
            <div className="register">
                <p className="register__title">Enter Your Account Detail</p>
                <p className="register__detail">Enter your account detail and a strong password to secure your account</p>
            </div>
        </>

    );
}

export default Register;