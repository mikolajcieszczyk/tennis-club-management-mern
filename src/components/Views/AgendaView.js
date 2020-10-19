import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from "react-router-dom";

import AddEvent from '../EventsActions/AddEvent';
import EditEvent from '../EventsActions/EditEvent';
import EventsList from '../EventsActions/EventsList';
import Scheduler from '../EventsActions/Scheduler';

import { agendaButtons } from '../../assets/data/navButtons';

const listAgendaButtons = agendaButtons.map((button) =>
    <div key={button.title.toString()}><NavLink activeStyle={{ textDecoration: 'underline', fontWeight: '700' }} className="submenu__button" to={button.link} alt={button.title} key={button.title.toString()}><img src={button.src} alt={button.alt} /><span>{button.title}</span></NavLink></div>
)

export default class AgendaView extends Component {
    render() {
        return (
            <Router>
                <main className="views agenda-view">
                    <div className="main__submenu">
                        {listAgendaButtons}
                    </div>
                    <div className="main__agenda">
                        <Switch>
                            <Route exact path="/scheduler" component={Scheduler} />
                            <Route path="/events-list" component={EventsList} />
                            <Route path="/add-event" component={AddEvent} />
                            <Route path="/edit-event/:id" component={EditEvent} />
                        </Switch>
                    </div>
                </main>
            </Router>
        )
    }
}
