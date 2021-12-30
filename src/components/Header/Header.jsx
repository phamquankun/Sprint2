import { IconButton, Menu, MenuItem } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import currenciesApi from '../../apis/currenciesApi';
import languagesApi from '../../apis/languagesApi';
import './Header.scss';
import { getCurrency } from './headerSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../../pages/Auth/userSlice';
Header.propTypes = {

};

function Header(props) {
    const loggedInUser = useSelector(state => state.user.current)
    console.log('check check', loggedInUser)
    const isLoggedIn = !!loggedInUser
    console.log('heck logged',isLoggedIn)
    const dispatch = useDispatch();
    const location = useLocation()
    const tabs = ['Language and Region', 'Currency']
    const [types, setType] = React.useState('Language and Region')
    const [languages, setLanguages] = React.useState([])
    const [currencies, setCurrencies] = React.useState([])
    const [currency, setCurrency] = React.useState('USD')
    const data = useSelector((state) => state.currency.value);
    if (data.length > 0 && currency !== data[0]) {
        setCurrency(data[0]);
    }
    React.useEffect(() => {
        const fetchDataLangs = async () => {
            const langsList = await languagesApi.getAll();
            setLanguages(langsList)
        }
        fetchDataLangs()
    }, [])
    React.useEffect(() => {
        const fetchDatasetCurrencies = async () => {
            const currsList = await currenciesApi.getAll();
            setCurrencies(currsList)
        }
        fetchDatasetCurrencies()
    }, [])
    const handleClickCurrency = async (curr) => {
        try {
            const action = getCurrency(curr.code)
            const resultAction = await dispatch(action)
            const unwrapreslt = unwrapResult(resultAction)
            // console.log('check unwrapResult',unwrapreslt)
        } catch (error) {
            console.log('Lỗi', error.message)
        }
    }
    const handleLogOutClick = () => {
        const action = logout()
        dispatch(action)
    }
    return (

        <div className="header">
            <p className="header__left__logo-text"><Link to='/'>Exchange</Link></p>
            {isLoggedIn && <Link to='/' className="header__right__wallets">Wallets</Link>}
            {!isLoggedIn && <Link to='/login' className="header__right__login">Login</Link>}
            {isLoggedIn &&
                <IconButton className="header__right__loggedin">
                    <AccountCircleIcon />
                    <div className="menu-profile">
                        <p>****@gmail.com</p>
                        <div onClick={handleLogOutClick}>
                            <ExitToAppIcon /><span>Log out</span>
                        </div>
                    </div>
                </IconButton>}
            {!isLoggedIn && <Link to='/register' className="header__right__register">Register</Link>}
            {isLoggedIn &&
                <IconButton className="header__right__loggedin1">
                    <NotificationsNoneIcon />
                </IconButton>}
            <Link to='/' className="header__right__downloads">
                Downloads
                <div className="header__right__downloads-pop-up">
                    <img src="https://printgo.vn/uploads/media/790919/tao-ma-qr-code-san-pham-1_1620927223.jpg" alt="QR" />
                    <p className="scan-to-download">Scan to download app IOS and Android</p>
                    <button className="pop-up-btn">More Download Options</button>
                </div>
            </Link>
            <Link to='#' className="header__right__language-currency">
                {location.pathname !== '/' ? 'English' : `English | ${currency}`}
                <div className="choose-language-or-currency">
                    <div className="groupoption">
                        {
                            (location.pathname === '/' && tabs.map(tab => (
                                <p
                                    className="option"
                                    key={tab}
                                    onClick={() => setType(tab)}
                                    style={
                                        types === tab ? {
                                            borderBottom: '1px solid #FCD535',

                                        } : {}
                                    }
                                >{tab}</p>
                            ))) || (
                                <p className="option" style={{ borderBottom: '1px solid #FCD535' }}>
                                    Language and Region
                                </p>
                            )
                        }
                    </div>
                    <ul className="listoption">
                        {
                            (location.pathname === '/' && (types === 'Language and Region' ?
                                languages.map((lang) => {
                                    return (
                                        <li key={lang.code} className="li-option">{lang.name}</li>
                                    )
                                }) : currencies.map((curr) => {
                                    return (
                                        <li key={curr.code} className="li-option"
                                            onClick={() => handleClickCurrency(curr)}
                                        >{curr.code}</li>
                                    )
                                }))) || (languages.map((lang) => {
                                    return (
                                        <li key={lang.code} className="li-option">{lang.name}</li>
                                    )
                                }))
                        }
                    </ul>
                </div>
            </Link>
        </div>

    );
}

export default Header;