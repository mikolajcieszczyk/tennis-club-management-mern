import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class EditEmployee extends Component {
    constructor() {
        super();

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeMale = this.onChangeMale.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAccountNumber = this.onChangeAccountNumber.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            employee: [],
            name: '',
            surname: '',
            type: '',
            male: '',
            phone: '',
            email: '',
            account_number: '',
            showPopup: false,
            isError: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/employees/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    surname: response.data.surname,
                    type: response.data.type,
                    male: response.data.male,
                    phone: response.data.phone,
                    email: response.data.email,
                    account_number: response.data.account_number,
                })
            })
            .catch(function (error) {
                console.log(error.message)
            })

        axios.get('http://localhost:5000/employees/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        employee: res.data.map(employee => employee.surname),
                    })
                }
            })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
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

    onChangeAccountNumber(e) {
        this.setState({
            account_number: e.target.value
        })
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            isError: false,
            errorMessage: ''
        });

        this.props.history.push('/employees-list');
    };

    onSubmit(e) {
        e.preventDefault();

        const employee = {
            name: this.state.name,
            surname: this.state.surname,
            type: this.state.type,
            male: this.state.male,
            phone: this.state.phone,
            email: this.state.email,
            account_number: this.state.account_number
        }

        console.log(employee);

        axios.post('http://localhost:5000/employees/update/' + this.props.match.params.id, employee)
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
                        <label>Current employee name:</label>
                        <span>{this.state.name}</span><br />
                        <span>{this.state.surname}</span><br />
                        <label>New client name:</label>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                        <label>New client surname:</label>

                        <input
                            type="text"
                            value={this.state.surname}
                            onChange={this.onChangeSurname}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <input
                            type="text"
                            required
                            value={this.state.type}
                            onChange={this.onChangeType}
                        >
                        </input>
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
                        <label>Account Number: </label>
                        <input
                            required
                            type="text"
                            value={this.state.account_number}
                            onChange={this.onChangeAccountNumber}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Edit Employee"
                            className="submit-btn"
                        />
                    </div>
                </form>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Pracownik o takiej nazwie już istnieje! <br /> <span>Spróbuj jeszcze raz!</span></p> : `Employee updated correctly!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />

            </div>
        );
    }
};

export default withRouter(EditEmployee)