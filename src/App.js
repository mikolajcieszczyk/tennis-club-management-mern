import React from 'react';
import './styles/app.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Nav from './components/Nav/Nav';
import TopBar from './components/TopBar/TopBar';
import HomeView from './components/Views/HomeView';
import AgendaView from './components/Views/AgendaView';
import ClientsView from './components/Views/ClientsView';
import StoreView from './components/Views/StoreView';
import EmployeesView from './components/Views/EmployeesView';
import FinancesView from './components/Views/FinancesView';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
    <Router>
        <TopBar />
        <Nav />
        <Switch>
          <Route path="/" exact component={HomeView} />
          <Route path="/agenda" component={AgendaView} />
          <Route path="/clients" component={ClientsView} />
          <Route path="/employees" component={EmployeesView} />
          <Route path="/store" component={StoreView} />
          <Route path="/finances" component={FinancesView} />
        </Switch>
        <Footer />
    </Router>
      
    </div>
  );
}

export default App;
