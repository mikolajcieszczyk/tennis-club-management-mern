import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditClient extends Component {
    constructor() {
        super();

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeMale = this.onChangeMale.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: [],
            username: '',
            male: '',
            phone: '',
            email: '',
            skills: '',
            showPopup: false,
            isError: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    male: response.data.male,
                    phone: response.data.phone,
                    email: response.data.email,
                    skills: response.data.skills,
                })
            })
            .catch(function (error) {
                console.log(error.message)
            })

        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        user: res.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeMale(e) {
        this.setState({
            male: e.target.value
        })
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeSkills(e) {
        this.setState({
            skills: e.target.value
        })
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            isError: false,
            errorMessage: ''
        });

        this.props.history.push('/clients-list');
    };

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            male: this.state.male,
            phone: this.state.phone,
            email: this.state.email,
            skills: this.state.skills
        }

        console.log(user);

        axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
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
            <div>
                <form className="my-form" onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Current client name:</label>
                        <span
                            className="edit-client__current-client-name"
                        >
                            {this.state.username}
                        </span><br />
                        <label>New client name:</label>
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Male: </label>
                        <input
                            type="text"
                            required
                            value={this.state.male}
                            onChange={this.onChangeMale}
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label>Phone: </label>
                        <input
                            required
                            type="text"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                        />
                    </div>
                    <div className="form-group">
                        <label>E-Mail: </label>
                        <input
                            required
                            type="text"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input
                            required
                            type="text"
                            value={this.state.skills}
                            onChange={this.onChangeSkills}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Edit Client"
                            className="submit-btn"
                        />
                    </div>
                </form>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Klient o takiej nazwie już istnieje! <br /> <span>Spróbuj jeszcze raz!</span></p> : `Client updated correctly!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />

            </div>
        );
    }
};

export default withRouter(EditClient)