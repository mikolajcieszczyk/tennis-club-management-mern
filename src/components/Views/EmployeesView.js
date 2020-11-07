import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from "react-router-dom";

import AddEmployee from '../EmployeesActions/AddEmployee';
import EditEmployee from '../EmployeesActions/EditEmployee';
import EmployeesList from '../EmployeesActions/EmployeesList';

import { employeesButtons } from '../../assets/data/navButtons';

const listEmployeesButtons = employeesButtons.map((button) =>
    <div key={button.title.toString()}><NavLink activeStyle={{ textDecoration: 'underline', fontWeight: '700' }} className="submenu__button" to={button.link} alt={button.title} key={button.title.toString()}><img src={button.src} alt={button.alt} /><span>{button.title}</span></NavLink></div>
)

export default class EmployeesView extends Component {
    render() {
        return (
            <Router>
                <main className="views employees-view">
                    <div className="main__submenu">
                        {listEmployeesButtons}
                    </div>
                    <div className="main__employees">
                        <Switch>
                            <Route path="/employees/employees-list" component={EmployeesList} />
                            <Route path="/employees/add-employee" component={AddEmployee} />
                            <Route path="/employees/edit-employee/:id" component={EditEmployee} />
                        </Switch>
                    </div>
                </main>
            </Router>
        )
    }
}
