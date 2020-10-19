import React, { Component } from 'react';
import axios from 'axios';

import moment from 'moment';

export default class EditEvents extends Component {
    constructor() {
        super();

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCoach = this.onChangeCoach.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeFinishTime = this.onChangeFinishTime.bind(this);
        this.onChangeCourtNumber = this.onChangeCourtNumber.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: '',
            username: '',
            title: '',
            description: '',
            coach: '',
            start_time: '',
            end_time: '',
            courtNumber: '',
            group: '',
            price: '',
            coaches: [],
            users: [],
            showPopup: false,
            isError: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/events/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    description: response.data.description,
                    coach: response.data.coach,
                    start_time: moment(response.data.start_time).format("YYYY-MM-DDTkk:mm"),
                    end_time: moment(response.data.end_time).format("YYYY-MM-DDTkk:mm"),
                    courtNumber: response.data.courtNumber,
                    price: response.data.price,
                })
            })
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })

        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })

        axios.get('http://localhost:5000/employees/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        coaches: res.data.map(coach => coach.surname),
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            title: this.state.username
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeCoach(e) {
        this.setState({
            coach: e.target.value
        })
    }

    onChangeStartTime(e) {
        this.setState({
            start_time: e.target.value
        })
    }

    onChangeFinishTime(e) {
        this.setState({
            end_time: e.target.value
        })
    }

    onChangeCourtNumber(e) {
        this.setState({
            courtNumber: e.target.value,
            group: this.state.courtNumber
        })
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            isError: false,
            errorMessage: ''
        });

        this.props.history.push('/events-list');
    };

    onSubmit(e) {
        e.preventDefault();

        const event = {
            id: this.state.id,
            username: this.state.username,
            title: this.state.username,
            description: this.state.description,
            coach: this.state.coach,
            start_time: new Date(this.state.start_time).valueOf(),
            end_time: new Date(this.state.end_time).valueOf(),
            courtNumber: this.state.courtNumber,
            group: this.state.courtNumber,
            price: this.state.price,
        }

        console.log(event);

        axios.post('http://localhost:5000/events/update/' + this.props.match.params.id, event)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })

        this.setState({
            showPopup: true
        })
    }

    render() {
        return (
            <div className="main-part">
                <form className="my-form" onSubmit={this.onSubmit}>
                    <div className="make-row-form">
                        <div className="form-group">
                            <label>Username: </label>
                            <select
                                required
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                            >
                                {
                                    this.state.users.map(function (user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <select
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                            >
                                <option style={{ display: "none" }}></option>
                                <option value="Court">Court</option>
                                <option value="Lesson">Lesson</option>
                                <option value="Day Camps">Day Camps</option>
                                <option value="Tournament">Tournament</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Coach: </label>
                            <select
                                required
                                defaultValue={this.state.coach}
                                onChange={this.onChangeCoach}
                            >
                                <option style={{ display: "none" }}></option>
                                {
                                    this.state.coaches.map(function (coach) {
                                        return <option
                                            key={coach}
                                            value={coach}>{coach}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="make-row-form">
                        <div className="form-group">
                            <label>Start Time:</label>
                            <input
                                id="datetime-local"
                                type="datetime-local"
                                onChange={this.onChangeStartTime}
                                value={this.state.start_time}
                            />
                        </div>
                        <div className="form-group">
                            <label>Finish Time:</label>
                            <input
                                id="datetime-local"
                                type="datetime-local"
                                value={this.state.end_time}
                                onChange={this.onChangeFinishTime}
                            />
                        </div>
                    </div>
                    <div className="make-row-form">
                        <div className="form-group">
                            <label>Court number:</label>
                            <input
                                type="text"
                                value={this.state.courtNumber}
                                onChange={this.onChangeCourtNumber}
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                value={this.state.price}
                                onChange={this.onChangePrice}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Edit Event"
                            className="submit-btn"
                        />
                    </div>
                </form>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Coś poszło nie tak :-( <br /> <span>Spróbuj jeszcze raz!</span></p> : `Event updated correctly!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />

            </div>
        );
    }
};