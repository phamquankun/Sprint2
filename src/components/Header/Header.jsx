import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import currenciesApi from '../../apis/currenciesApi';
import languagesApi from '../../apis/languagesApi';
import './Header.scss';
import { getCurrency, getData } from './headerSlice';
Header.propTypes = {

};

function Header(props) {
    const dispatch = useDispatch();
    const tabs = ['Language and Region', 'Currency']
    const [types, setType] = React.useState('Language and Region')
    const [languages, setLanguages] = React.useState([])
    const [currencies, setCurrencies] = React.useState([])
    const [currency, setCurrency] = React.useState('USD')
    const data = useSelector((state) => state.currency.value);
    if (data.length > 0 && currency !== data[0]) {
        setCurrency(data[0]);
    }
    // console.log('check currency picked', currency)
    // // console.log('check tien te', currencies)
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
    const handleClickCurrency = async(curr) => {
        // console.log('checkkkk', curr)
        try {
            const action = getCurrency(curr.code)
            const resultAction = await dispatch(action)
            const unwrapreslt = unwrapResult(resultAction)
            // console.log('check unwrapResult',unwrapreslt)
        } catch (error) {
            console.log('Lỗi', error.message)
        }
        // setCurrency(curr.code)
        // dispatch(getData(currency));
    }
    return (

            <div className="header">
                <p className="header__left__logo-text">Exchange</p>
                <Link to='/login' className="header__right__login">Login</Link>
                <Link to='/register' className="header__right__register">Register</Link>
                <Link to='/' className="header__right__downloads">
                    Downloads
                    <div className="header__right__downloads-pop-up">
                        <img src="https://printgo.vn/uploads/media/790919/tao-ma-qr-code-san-pham-1_1620927223.jpg" alt="QR" />
                        <p className="scan-to-download">Scan to download app IOS and Android</p>
                        <button className="pop-up-btn">More Download Options</button>
                    </div>
                </Link>
                <Link to='/' className="header__right__language-currency">
                    English | {currency}
                    <div className="choose-language-or-currency">
                            <div className="groupoption">
                                {
                                    tabs.map(tab => (
                                        <p  
                                            className="option"
                                            key={tab}
                                            onClick={() => setType(tab)}
                                            style={
                                                types === tab ? {
                                                    borderBottom: '1px solid #FCD535',

                                                } : {}
                                            }
                                        >
                                            {tab}</p>
                                    ))
                                }
                            </div>
                            <ul className="listoption">
                                {
                                    types === 'Language and Region' ?
                                        languages.map((lang) => {
                                            return (
                                                <li key={lang.code} className="li-option">{lang.name}</li>
                                            )
                                        }) : currencies.map((curr) => {
                                            return (
                                                <li key={curr.code} className="li-option"
                                                onClick={()=>handleClickCurrency(curr)}
                                                >{curr.code}</li>
                                            )
                                        })
                                }
                            </ul>
                    </div>
                </Link>
            </div>
    );
}

export default Header;