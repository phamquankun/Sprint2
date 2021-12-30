import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import coinsApi from '../apis/coinsApi';
import SelectField from './form-control/Select-field/SelectField';

const Test = () => {
    const [orders, setOrders] = useState([]);
    const [currency, setCurrency] = React.useState('USD');
    const [coins, setCoins] = React.useState([])
    console.log('check orders', orders)
    const currencyPair = 'btcusd';
    useEffect(() => {
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
    }, [currencyPair]);

    React.useEffect(() => {
        const fetchDataCoins = async () => {
            const langsList = await coinsApi.getAll();
            setCoins(langsList)
        }
        fetchDataCoins()
    }, [])
    return (
        <SelectField/>
    );
};

export default Test;