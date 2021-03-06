import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from "react-router-dom";

import ProductsList from '../ProductsActions/ProductsList';
import AddProduct from '../ProductsActions/AddProduct';
import EditProduct from '../ProductsActions/EditProduct';
import SoldProducts from '../ProductsActions/SoldProducts';
import ProductDetails from '../ProductsActions/ProductDetails';

import { storeButtons } from '../../assets/data/navButtons';

const listStoreButtons = storeButtons.map((button) =>
    <div key={button.title.toString()}><NavLink activeStyle={{ textDecoration: 'underline', fontWeight: '700' }} className="submenu__button" to={button.link} alt={button.title} key={button.title.toString()}><img src={button.src} alt={button.alt} /><span>{button.title}</span></NavLink></div>
)

export default class StoreView extends Component {
    render() {
        return (
            <Router>
                <main className="views clients-view">
                    <div className="main__submenu">
                        {listStoreButtons}
                    </div>
                    <div className="main__products">
                        <Switch>
                            <Route path="/store/product-details/:id" component={ProductDetails} />
                            <Route path="/store/products-list" component={ProductsList} />
                            <Route path="/store/add-product" component={AddProduct} />
                            <Route path="/store/edit-product/:id" component={EditProduct} />
                            <Route path="/store/sold-products" component={SoldProducts} />
                        </Switch>
                    </div>
                </main>
            </Router>
        )
    }
}
