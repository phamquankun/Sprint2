import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import coinsApi from '../apis/coinsApi';

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
        <Table borderless>
            <thead>
                <tr>
                    <th className="table-header">
                        Name
                    </th>
                    <th className="table-header">
                        Last Price
                    </th>
                    <th className="table-header">
                        24h Change
                    </th>
                </tr>
            </thead>
            <tbody>
                <>
                    {
                        orders.map((order, index) => {
                            return (
                                order[1] === currency &&

                                <tr key={index}>
                                    <td>
                                        {order[0]}
                                    </td>
                                    <td>
                                        {order[2] + ` ${currency}`}
                                    </td>
                                    <td style={order[3] > 0 ? { color: 'green', marginLeft: '3px' } : { color: 'red' }}>
                                        {order[3]}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </>
            </tbody>
        </Table>
    );
};

export default Test;