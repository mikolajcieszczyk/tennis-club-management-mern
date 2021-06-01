import React, { Component } from 'react';
import './styles/style.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from './components/Header/Header';
import HomeView from './components/Views/HomeView';
import AgendaView from './components/Views/AgendaView';
import ClientsView from './components/Views/ClientsView';
import StoreView from './components/Views/StoreView';
import EmployeesView from './components/Views/EmployeesView';
import FinancesView from './components/Views/FinancesView';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route path="/agenda/events-list" component={AgendaView} />
            <Route path="/clients/clients-list" component={ClientsView} />
            <Route path="/employees/employees-list" component={EmployeesView} />
            <Route path="/store/products-list" component={StoreView} />
            <Route path="/finances" component={FinancesView} />
          </Switch>
          <Footer />
        </Router>

      </div>
    );
  }
}

export default App;
