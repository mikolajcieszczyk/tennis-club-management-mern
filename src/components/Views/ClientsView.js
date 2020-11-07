import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from "react-router-dom";

import AddClient from '../ClientsActions/AddClient';
import EditClient from '../ClientsActions/EditClient';
import ClientsList from '../ClientsActions/ClientsList';

import { clientsButtons } from '../../assets/data/navButtons';

const listClientsButtons = clientsButtons.map((button) =>
    <div key={button.title.toString()}><NavLink activeStyle={{ textDecoration: 'underline', fontWeight: '700' }} className="submenu__button" to={button.link} alt={button.title} key={button.title.toString()}><img src={button.src} alt={button.alt} /><span>{button.title}</span></NavLink></div>
)

export default class ClientsView extends Component {
    render() {
        return (
            <Router>
                <main className="views clients-view">
                    <div className="main__submenu">
                        {listClientsButtons}
                    </div>
                    <div className="main__clients">
                        <Switch>
                            <Route path="/clients/clients-list" component={ClientsList} />
                            <Route path="/clients/add-client" component={AddClient} />
                            <Route path="/clients/edit-client/:id" component={EditClient} />
                        </Switch>
                    </div>
                </main>
            </Router>
        )
    }
}
