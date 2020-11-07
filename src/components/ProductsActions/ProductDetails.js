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
            product: [],
            product_id: '',
            showPopup: false,
            isError: false,
            errorMessage: ''
        }

        this.sellProduct = this.sellProduct.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:5000/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    product_id: response.data._id,
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

    sellProduct() {

        const soldProduct = {
            product_name: this.state.product_name,
            product_photo: this.state.product_photo,
            product_type: this.state.product_type,
            product_description: this.state.product_description,
            product_condition: this.state.product_condition,
            product_price: this.state.product_price,
        }

        axios.post('http://localhost:5000/soldproducts/add', soldProduct)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err.message)
                this.setState({
                    isError: true,
                    errorMessage: err.message
                });
            })

        axios.delete('http://localhost:5000/products/' + this.state.product_id)
            .then(res => console.log(res.data));

        this.setState({
            showPopup: true
        })
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            isError: false,
            errorMessage: ''
        });

        this.props.history.push('/store/products-list');
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
                        <button onClick={this.sellProduct} className="sell-btn" alt="edit">SELL</button>
                    </div>
                </div>


                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Something bad happens :-( <br /> <span>Try again!</span></p> : `Product sold!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />

            </div>
        );
    }
};