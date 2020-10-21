const router = require('express').Router();
let SoldProduct = require('../models/soldProducts.model');

router.route('/').get((req, res) => {
    SoldProduct.find()
        .then(soldProducts => res.json(soldProducts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const product_name = req.body.product_name;
    const product_photo = req.body.product_photo;
    const product_type = req.body.product_type;
    const product_description = req.body.product_description;
    const product_condition = req.body.product_condition;
    const product_price = req.body.product_price;

    const newSoldProduct = new SoldProduct({
        product_name,
        product_photo,
        product_type,
        product_description,
        product_condition,
        product_price
    });

    newSoldProduct.save()
        .then(() => res.json('Product sold!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    SoldProduct.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;