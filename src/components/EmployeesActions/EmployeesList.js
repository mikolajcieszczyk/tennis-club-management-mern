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

let coachesArr = [];
let office_employeesArr = [];

export default class EmployeesList extends Component {
    constructor() {
        super();

        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.coachesList = this.coachesList.bind(this);

        this.state = {
            employees: [],
            coaches: [],
            office_employees: [],
            showEmployees: true,
            showCoaches: false,
            showOfficeEmployees: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employees/')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].type.includes("coach")) {
                        coachesArr.push(res.data[i])
                    } else if (res.data[i].type.includes("office")) {
                        office_employeesArr.push(res.data[i])
                    }
                }

                this.setState({
                    employees: res.data,
                    coaches: coachesArr,
                    office_employees: office_employeesArr
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

    coachesList() {
        this.setState({
            showCoaches: true
        })

        console.log(this.state.showCoaches)

        this.EmployeesList();
    }

    EmployeesList() {
        if (this.state.showEmployees) {
            return this.state.employees.map(currentEmployee => {
                return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id} />;
            })
        } else if (this.state.showCoaches) {
            return this.state.coaches.map(currentEmployee => {
                return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id} />;
            })
        } else if (this.state.showOfficeEmployees) {
            return this.state.office_employees.map(currentEmployee => {
                return <Employee employee={currentEmployee} deleteEmployee={this.deleteEmployee} key={currentEmployee._id} />;
            })
        }
    }

    

    render() {
        return (
            <div>
                {/* <Link onClick={this.setState({ showEmployees: true })}>showEmployees</Link> */}
                <button onClick={this.coachesList}>showCoaches</button>
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