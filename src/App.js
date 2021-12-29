
import React, { useEffect } from 'react';
import coinsApi from './apis/coinsApi';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Test from './components/test';
import Home from './pages/Home/Home';
import { Route, Switch } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import currenciesApi from './apis/currenciesApi';
function App() {
  return (

    <div className="App">
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </Switch>
      <Footer />
      {/* <Test /> */}
    </div>
  );
}

export default App;
