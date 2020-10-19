import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Client = props => (
    <tr>
        <td>{props.client.username}</td>
        <td>{props.client.male}</td>
        <td>{props.client.phone}</td>
        <td>{props.client.email}</td>
        <td>{props.client.skills}</td>
        <td>
            <Link to={'/edit-client/' + props.client._id}><button className="edit-btn" alt="edit">EDIT</button></Link>  <button className="delete-btn" alt="delete" onClick={() => { props.deleteClient(props.client._id) }}>delete</button>
        </td>
    </tr>
)

export default class ClientsList extends Component {
    constructor(props) {
        super(props);

        this.deleteClient = this.deleteClient.bind(this);

        this.state = {
            clients: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                this.setState({
                    clients: res.data
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    deleteClient(id) {
        axios.delete('http://localhost:5000/users/' + id)
            .then(res => console.log(res.data));

        this.setState({
            clients: this.state.clients.filter(el => el._id !== id)
        })
    }

    clientsList() {
        return this.state.clients.map(currentClient => {
            return <Client client={currentClient} deleteClient={this.deleteClient} key={currentClient._id} />;
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th>Client Name</th>
                            <th>Male</th>
                            <th>Phone</th>
                            <th>E-Mail</th>
                            <th>Skills</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.clientsList()}
                    </tbody>
                </table>
            </div>
        );
    }
};