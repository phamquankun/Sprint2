import React from 'react';
import { Table } from 'reactstrap';
import coinsApi from '../../apis/coinsApi';
import Banner from '../../components/Banner/Banner';
import Rectangle from '../../components/Rectangle/Rectangle';
import './Home.scss';
import { useSelector } from "react-redux";
Home.propTypes = {

};

function Home(props) {
    const [currency, setCurrency] = React.useState('USD');
    const data = useSelector((state) => state.currency.value);
    // console.log('check data ne', data[0])
    const [coins, setCoins] = React.useState([])
    const [orders, setOrders] = React.useState([]);

    if (data.length > 0 && currency !== data[0]) {
        setCurrency(data[0]);
    }
    React.useEffect(() => {
        const fetchDataCoins = async () => {
            const langsList = await coinsApi.getAll();
            setCoins(langsList)
        }
        fetchDataCoins()
    }, [])
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
        <>
            <Rectangle />
            <Banner />
            <div className="markettrend">
                Market trend
            </div>
            <div className="markettrend-table">
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
                                            {coins.map(coin => {
                                                return (
                                                    <tr key={coin.id}>
                                                        <td>
                                                            {coin.code === order[0] ? <img src={coin.image} alt='' width="22px" style={{ marginRight: '6px', marginTop: '-2px' }} /> : ''}
                                                            {coin.code === order[0] ? <>{coin.name} - <span style={{color: 'gray'}}>{order[0]}</span></> : ''}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
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
            </div>
            <div className="start-trading">
                <p className="start-trading--text">Start trading now</p>
                <button className="btn--register">
                    <p>Register Now</p>
                </button>
                <button className="btn--trade">
                    <p>Trade Now</p>
                </button>

            </div>
        </>
    );
}

export default Home;