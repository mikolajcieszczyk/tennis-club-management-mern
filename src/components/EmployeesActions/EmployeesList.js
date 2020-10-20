import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = props => (
    <tr>
        <td>{props.employee.name}</td>
        <td>{props.employee.surname}</td>
        <td>{props.employee.type}</td>
        <td>{props.employee.male}</td>
        <td>{props.employee.phone}</td>
        <td>{props.employee.email}</td>
        <td>
            <Link to={'/edit-employee/' + props.employee._id}><button className="edit-btn" alt="edit">EDIT</button></Link>  <button className="delete-btn" alt="delete" onClick={() => { props.deleteEmployee(props.employee._id) }}>delete</button>
        </td>
    </tr>
);

export default class EmployeesList extends Component {
    constructor() {
        super();

        this.deleteEmployee = this.deleteEmployee.bind(this);

        this.state = {
            employees: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employees/')
            .then(res => {
                this.setState({
                    employees: res.data,
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    deleteEmployee(id) {
        axios.delete('http://localhost:5000/employees/' + id)
            .then(res => console.log(res.data));

        this.setState({
            employees: this.state.employees.filter(el => el._id !== id)
        })
    }

    EmployeesList() {
            return this.state.employees.map(currentEmployee => {
                return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id} />;
            })
        } 

    
    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Type</th>
                            <th>Male</th>
                            <th>Phone</th>
                            <th>E-Mail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.EmployeesList()}
                    </tbody>
                </table>
            </div>
        );
    }
};