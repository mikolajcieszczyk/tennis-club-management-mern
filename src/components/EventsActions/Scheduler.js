import React, { Component } from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import axios from 'axios';

export default class Scheduler extends Component {
    constructor() {
        super();
        this.state = {
            myItems: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/events/')
            .then(res => {
                this.setState({
                    myItems: res.data
                })
            })
    }
    render() {
        const groups = [
            { id: 1, title: 'COURT 1', height: 40 },
            { id: 2, title: 'COURT 2', height: 40 },
            { id: 3, title: 'COURT 3', height: 40 },
            { id: 4, title: 'COURT 4', height: 40 }
        ]

        return (
            <main className="agenda__scheduler">
                <Timeline
                    groups={groups}
                    items={this.state.myItems}
                    defaultTimeStart={moment().subtract(4, 'hour')}
                    defaultTimeEnd={moment().add(12, 'hour')}
                />
            </main>
        );
    }
}