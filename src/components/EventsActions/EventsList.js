import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Event = props => (
    <tr>
        <td>{props.event.username}</td>
        <td>{props.event.description}</td>
        <td>{props.event.coach}</td>
        <td>{moment(props.event.start_time).format("YYYY-MM-DDTkk:mm")}</td>
        <td>{moment(props.event.end_time).format("YYYY-MM-DDTkk:mm")}</td>
        <td>{props.event.courtNumber}</td>
        <td>{props.event.price}</td>

        <td>
            <Link to={'/edit-event/' + props.event._id}><button className="edit-btn" alt="edit">EDIT</button></Link> <button className="delete-btn" alt="delete" onClick={() => { props.deleteEvent(props.event._id) }}>delete</button>
        </td>
    </tr>
)

export default class EventsList extends Component {
    constructor() {
        super();

        this.deleteEvent = this.deleteEvent.bind(this);

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/events/')
            .then(res => {
                this.setState({
                    events: res.data
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    deleteEvent(id) {
        axios.delete('http://localhost:5000/events/' + id)
            .then(res => console.log(res.data));

        this.setState({
            events: this.state.events.filter(el => el._id !== id)
        })
    }

    eventsList() {
        return this.state.events.map(currentEvent => {
            return <Event event={currentEvent} deleteEvent={this.deleteEvent} key={currentEvent._id} />;
        })
    }
    
    render() {
        return (
            <main className="agenda__events-list">
                <table className="table">
                    <thead>
                        <tr className="table-header">
                            <th>Client Name</th>
                            <th>Description</th>
                            <th>Coach</th>
                            <th>Start Time</th>
                            <th>Finish Time</th>
                            <th>Court Number</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.eventsList()}
                    </tbody>
                </table>
            </main>
        )
    }
}
