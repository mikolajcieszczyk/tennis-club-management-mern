import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class AddEvent extends Component {
    constructor() {
        super();

        this.getRandomId = this.getRandomId.bind(this);
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
            users: [],
            coaches: [],
            showPopup: false,
            isError: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
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

    getRandomId(min, max) {
        min = Math.ceil(1);
        max = Math.floor(100000);
        return Math.floor(Math.random() * (max - min)) + min;
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
            id: this.getRandomId(),
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

        axios.post('http://localhost:5000/events/add', event)
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
                                value={this.state.coach}
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
                        {/* <div className="form-group">
                            <label>ID:</label>
                            <input
                                type="text"
                                value={this.state.id}
                                onChange={this.onChangeId}
                            />
                        </div> */}
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Event"
                            className="submit-btn"
                        />
                    </div>
                </form>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Coś poszło nie tak :-( <br /> <span>Spróbuj jeszcze raz!</span></p> : `Event added correctly!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />

            </div>
        );
    }
};

export default withRouter(AddEvent)