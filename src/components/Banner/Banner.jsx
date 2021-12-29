import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss'
import { useSelector } from 'react-redux';
Banner.propTypes = {

};

function Banner(props) {
    const [orders, setOrders] = React.useState([]);
    const [currency, setCurrency] = React.useState('USD');
    const data = useSelector((state) => state.currency.value);
    if (data.length > 0 && currency !== data[0]) {
        setCurrency(data[0]);
    }
    React.useEffect(() => {
        const subscribe = {
            method: "SUBSCRIBE",
            topic: "MARKET_PRICE"
        };
        const ws = new WebSocket('ws://localhost:8080/stream');

        ws.onopen = () => {
            ws.send(JSON.stringify(subscribe));
        };
        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            setOrders(response.data);
        };
        ws.onclose = () => {
            ws.close();
        };

        return () => {
            ws.close();
        };
    }, [currency]);
    return (
        <div className="banner">
            <div className="banner__title--buy-and-sell">
                Buy and sell Crypto in minutes
            </div>
            <div className="banner__title--sologan">
                Join the world's largest crypto exchange
            </div>
            <button className="banner__btn">
                <p>Register Now</p>
            </button>
            <div className="banner__slide">
                <div className="banner__slide-1">
                    <img src="https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png" alt="" />
                </div>
                <div className="banner__slide-2">
                    <img src="https://dautu.io/wp-content/uploads/2021/10/tim-hieu-ve-binance-pay-0.png" alt="" />
                </div>
                <div className="banner__slide-3">
                    <img src="https://public.bnbstatic.com/image/cms/blog/20210303/74a262a2-c2f0-45c8-9334-f1fb0d60111f.png" alt="" />
                </div>
                <div className="banner__slide-4">
                    <img src="https://public.bnbstatic.com/image/cms/blog/20200720/3e87ea3c-677a-401d-ac00-b2c7a5fb9666.png" alt="" />
                </div>
            </div>
            <div className="banner__exchange-rate">
                {
                    orders.map((order, index) => {
                        return (
                            order[1] === currency &&
                                <div className="group-exchange-rate" key={index}>
                                    <p className="currency">{order[0]}/BUSD<span style={order[3] >0 ? {color: 'green'} : {color: 'red'}}>{order[3]}</span></p>
                                    <p className="sothu2">{currency === 'VND' ? `${(order[2]/22840).toFixed(5)}` : `${order[2]}`}</p>
                                    <p className="sothu3">
                                        {currency === 'VND' ? `₫${Intl.NumberFormat('de-DE').format(order[2])}` : `$${order[2]}`}</p>
                                </div> 
                        )
                    })
                }


            </div>
        </div>
    );
}

export default Banner;