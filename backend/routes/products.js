const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const product_name = req.body.product_name;
    const product_photo = req.body.product_photo;
    const product_type = req.body.product_type;
    const product_description = req.body.product_description;
    const product_condition = req.body.product_condition;
    const product_price = req.body.product_price;

    const newProduct = new Product({
        product_name,
        product_photo,
        product_type,
        product_description,
        product_condition,
        product_price
    });

    newProduct.save()
        .then(() => res.json('Product added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.product_name = req.body.product_name;
            product.product_photo = req.body.product_photo;
            product.product_type = req.body.product_type;
            product.product_description = req.body.product_description;
            product.product_condition = req.body.product_condition;
            product.product_price = req.body.product_price;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;