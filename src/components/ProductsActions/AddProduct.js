import React, { Component } from 'react';
import axios from 'axios';

export default class EditProduct extends Component {
    constructor() {
        super();

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangePhoto = this.onChangePhoto.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCondition = this.onChangeCondition.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_photo: '',
            product_type: '',
            product_description: '',
            product_condition: '',
            product_price: '',
            showPopup: false,
            isError: false,
            errorMessage: ''
        }
    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        })
    }

    onChangePhoto(e) {
        this.setState({
            product_photo: e.target.value
        })
    }

    onChangeType(e) {
        this.setState({
            product_type: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            product_description: e.target.value
        })
    }

    onChangeCondition(e) {
        this.setState({
            product_condition: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            product_price: e.target.value
        })
    }

    hidePopup() {
        this.setState({
            showPopup: false,
            isError: false,
            errorMessage: ''
        });

        this.props.history.push('/products-list');
    };

    onSubmit(e) {
        e.preventDefault();

        const product = {
            product_name: this.state.product_name,
            product_photo: this.state.product_photo,
            product_type: this.state.product_type,
            product_description: this.state.product_description,
            product_condition: this.state.product_condition,
            product_price: this.state.product_price,
        }


        axios.post('http://localhost:5000/products/add', product)
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
                        <label>Product name: </label>
                        <input
                            type="text"
                            value={this.state.product_name}
                            onChange={this.onChangeProductName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Photo:</label>
                        <input
                            type="text"
                            value={this.state.product_photo}
                            onChange={this.onChangePhoto}
                        />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <input
                            type="text"
                            value={this.state.product_type}
                            onChange={this.onChangeType}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            onChange={this.onChangeDescription}
                            value={this.state.product_description}
                        />
                    </div>
                    <div className="form-group">
                        <label>Condition:</label>
                        <input
                            type="text"
                            value={this.state.product_condition}
                            onChange={this.onChangeCondition}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="text"
                            value={this.state.product_price}
                            onChange={this.onChangePrice}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="submit"
                            value="Add Product"
                            className="submit-btn"
                        />
                    </div>
                </form>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup--hidden" : "popup"}
                >
                    {this.state.isError === true ? <p className='error-message'>Something bad happens :-( <br /> <span>Try agaian!</span></p> : `Product added correctly!`}
                </div>

                <div
                    onClick={this.hidePopup}
                    className={this.state.showPopup === false ? "popup-background--hidden" : "popup-background"}
                />

            </div>
        );
    }
};