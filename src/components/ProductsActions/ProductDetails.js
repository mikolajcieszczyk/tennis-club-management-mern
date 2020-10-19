import React, { Component } from 'react';
import axios from 'axios';

export default class ProductDetails extends Component {
    constructor() {
        super();

        this.state = {
            product_name: '',
            product_photo: '',
            product_type: '',
            product_description: '',
            product_condition: '',
            product_price: '',
            products: [],
            showPopup: false,
            isError: false,
            errorMessage: ''
        }

        this.takeMeBack = this.takeMeBack.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_name: response.data.product_name,
                    product_photo: response.data.product_photo,
                    product_type: response.data.product_type,
                    product_description: response.data.product_description,
                    product_condition: response.data.product_condition,
                    product_price: response.data.product_price
                })
            })
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })
    }

    takeMeBack() {
        this.props.history.push('/products-list');
    };


    render() {
        return (
            <div className="main">
                <div className="product-details__container">
                    <div className="product-details__small-container">
                        <div>
                            <img src={this.state.product_photo} alt={this.state.product_name} className="product_photo" />
                        </div>
                    </div>

                    <div className="product-details__small-container">
                        <div>
                            <h2>Type</h2>
                            <span>{this.state.product_type}</span>
                        </div>
                        <div>
                            <h2>Condition</h2>
                            <span>{this.state.product_condition}</span>
                        </div>
                        <div>
                            <h2>Price</h2>
                            <span>{this.state.product_price} PLN</span>
                        </div>
                        
                    </div>

                    <div className="product-details__small-container">
                        <div>
                            <h2>Description</h2>
                            <p>{this.state.product_description}</p>
                        </div>
                    </div>

                </div>


                    <div
                        onClick={this.hidePopup}
                        className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                    >
                        {this.state.isError === true ? <p className='error-message'>Something bad happens :-( <br /> <span>Try agaian!</span></p> : `Product updated correctly!`}
                    </div>

                    <div
                        onClick={this.hidePopup}
                        className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                    />

            </div>
        );
    }
};