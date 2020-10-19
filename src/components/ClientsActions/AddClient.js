import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class AddClient extends Component {
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

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })

        this.setState({
            username: '',
            male: '',
            phone: '',
            email: '',
            skills: '',
            showPopup: true
        })



    }

    render() {
        return (
            <div>
                <form className="my-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Client Name: </label>
                        <input
                            required
                            type="text"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="make-row-form">
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
                            value="Add Client"
                            className="submit-btn"
                        />
                    </div>
                </form>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Klient o takiej nazwie już istnieje! <br /> <span>Spróbuj jeszcze raz!</span></p> : `Client added correctly!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />
            </div>
        );
    }
};

export default withRouter(AddClient)