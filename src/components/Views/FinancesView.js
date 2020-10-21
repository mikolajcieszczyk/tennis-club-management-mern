import React, { Component } from 'react'
import axios from 'axios';

import MenImage from '../../assets/images/icons8-school-director-100.png';
import WomenImage from '../../assets/images/icons8-brave-100.png';
import PeopleImage from '../../assets/images/icons8-people-100.png';
import EventsImage from '../../assets/images/icons8-show-property-100.png';
import EventsMoneyImage from '../../assets/images/icons8-paper-money-100.png';
import ProductsMoneyImage from '../../assets/images/icons8-rent-100.png';
import ProductsImage from '../../assets/images/icons8-tennis-racquet-100.png';

export default class FinancesView extends Component {
    constructor() {
        super();

        this.showDescription = this.showDescription.bind(this);
        this.hideDescription = this.hideDescription.bind(this);
        this.menArr = [];
        this.womenArr = [];
        this.priceArr = [];
        this.soldProductsPrice = [];

        this.state = {
            sumOfClients: '',
            men: '',
            women: '',
            sumOfEvents: '',
            eventsMoney: '',
            soldProducts: '',
            soldProductsMoney: '',
            showDescription: false,
            modalText: 'lalalala'
        }
    }

    componentDidMount() {

        this.setState({
            sumOfClients: '',
            men: '',
            women: '',
            sumOfEvents: '',
            eventsMoney: '',
        })

        axios.get('http://localhost:5000/users/')
            .then(res => {


                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].male.includes("M")) {
                        this.menArr.push(res.data[i])
                    } else if (res.data[i].male.includes("W")) {
                        this.womenArr.push(res.data[i])
                    }
                }

                this.setState({
                    sumOfClients: res.data.length,
                    men: this.menArr.length,
                    women: this.womenArr.length,
                })
            })
            .catch((error) => {
                console.log(error.message)
            })

        axios.get('http://localhost:5000/events/')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    this.priceArr.push(res.data[i].price)
                }

                this.setState({
                    sumOfEvents: res.data.length,
                    eventsMoney: this.priceArr.reduce(function (a, b) {
                        return a + b;
                    })
                })
            })
            .catch((error) => {
                console.log(error.message)
            })

        axios.get('http://localhost:5000/soldproducts/')
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    this.soldProductsPrice.push(res.data[i].product_price)
                }

                this.setState({
                    soldProducts: res.data.length,
                    soldProductsMoney: this.soldProductsPrice.reduce(function (a, b) {
                        return a + b;
                    })
                })
            })
    }

    showDescription(e) {
        this.setState({
            showDescription: true
        })
        if (e.target.parentElement.className === "stats__square1") {
            this.setState({
                modalText: 'number of clients'
            })
        } else if (e.target.parentElement.className === "stats__square3") {
            this.setState({
                modalText: 'number of female clients'
            })
        } else if (e.target.parentElement.className === "stats__square2") {
            this.setState({
                modalText: 'number of male clients'
            })
        } else if (e.target.parentElement.className === "stats__square4") {
            this.setState({
                modalText: 'number of events'
            })
        } else if (e.target.parentElement.className === "stats__square5") {
            this.setState({
                modalText: 'events earned money'
            })
        } else if (e.target.parentElement.className === "stats__square7") {
            this.setState({
                modalText: 'number of sold products'
            })
        } else if (e.target.parentElement.className === "stats__square8") {
            this.setState({
                modalText: 'sold products earned money'
            })
        }
    }

    hideDescription() {
        this.setState({
            showDescription: false
        })

    }

    render() {
        return (
            <div className="views stats__view">
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square1">
                    <img src={PeopleImage} alt="clients" />
                    <span>{this.state.sumOfClients}</span>
                </div>
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square2">
                    <img src={MenImage} alt="men" />
                    <span>{this.state.men}</span>
                </div>
                <div className="stats__square6">
                    <span
                        className={this.state.showDescription === false ? "stats__title" : "stats__title--hidden"}
                    >
                        STATS
                    </span>
                    <span
                        className={this.state.showDescription === false ? "stats__description--hidden" : "stats__description"}
                    >
                        {this.state.modalText}
                    </span>
                </div>
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square3">
                    <img src={WomenImage} alt="women" />
                    <span>{this.state.women}</span>
                </div>
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square4">
                    <img src={EventsImage} alt="events" />
                    <span>{this.state.sumOfEvents}</span>
                </div>
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square5">
                    <img src={EventsMoneyImage} alt="money" />
                    <span>{this.state.eventsMoney} PLN</span>
                </div>
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square7">
                    <img src={ProductsImage} alt="money" />
                    <span>{this.state.soldProducts}</span>
                </div>
                <div
                    onMouseEnter={this.showDescription}
                    onMouseLeave={this.hideDescription}
                    className="stats__square8">
                    <img src={ProductsMoneyImage} alt="money" />
                    <span>{this.state.soldProductsMoney} PLN</span>
                </div>
            </div>
        )
    }
}
