const router = require('express').Router();
let SoldProduct = require('../models/soldProducts.model');

router.route('/').get((req, res) => {
    SoldProduct.find()
        .then(soldProducts => res.json(soldProducts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const sold_product_name = req.body.sold_product_name;
    const sold_product_photo = req.body.sold_product_photo;
    const sold_product_type = req.body.sold_product_type;
    const sold_product_description = req.body.sold_product_description;
    const sold_product_condition = req.body.sold_product_condition;
    const sold_product_price = req.body.sold_product_price;

    const newSoldProduct = new soldProduct({
        sold_product_name,
        sold_product_photo,
        sold_product_type,
        sold_product_description,
        sold_product_condition,
        sold_product_price
    });

    newSoldProduct.save()
        .then(() => res.json('Product sold!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;