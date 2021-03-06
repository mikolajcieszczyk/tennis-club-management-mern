import React, { Component } from 'react'
import axios from 'axios';

const Product = props => (
    <tr>
        <td>{props.product.product_name}</td>
        <td><a href={props.product.product_photo} rel="noopener noreferrer" target="_blank">click</a></td>
        <td>{props.product.product_type}</td>
        <td>{props.product.product_condition}</td>
        <td>{props.product.product_price} PLN</td>

        <td>
            <button className="delete-btn" alt="delete" onClick={() => { props.deleteProduct(props.product._id) }}>delete</button>
        </td>
    </tr>
)

export default class SoldProducts extends Component {
    constructor() {
        super();

        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/soldproducts/')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    deleteProduct(id) {
        axios.delete('http://localhost:5000/soldproducts/' + id)
            .then(res => console.log(res.data));

        this.setState({
            products: this.state.products.filter(el => el._id !== id)
        })
    }

    productsList() {
        return this.state.products.map(currentProduct => {
            return <Product product={currentProduct} deleteProduct={this.deleteProduct} key={currentProduct._id} />;
        })
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-header table-products">
                            <th>Product Name</th>
                            <th>Photo</th>
                            <th>Type</th>
                            <th>Condition</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.productsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
