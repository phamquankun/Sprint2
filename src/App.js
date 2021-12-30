
import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Test from './components/test';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import Home from './pages/Home/Home';
function App() {
  const match= useRouteMatch()
  console.log('check match', match.url)
  const location = useLocation()
  console.log('check location', location.pathname)
  return (

    <div className="App">
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/register' component={Register} exact />
      </Switch>
      <Footer />
      {/* <Test /> */}
    </div>
  );
}

export default App;
