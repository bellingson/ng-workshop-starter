var express = require('express');

var router = express.Router();

var _ = require('lodash');

let products;

let OK = { message: 'ok' };

router.get('/', function (req, res, next) {

     if(req.query.findText == null) {
         res.send(products);
         return;
     }

     // return a filtered search
     let findText = req.query.findText.toLowerCase();

     let _products = _.filter(products, product => {
            return _.includes(product.name.toLowerCase(), findText);
         });

     res.send(_products);
    
});

router.get('/:id', function (req, res, next) {

    let productId = parseInt(req.params.id, 10);

    let product = _.find(products, p => p.id === productId );
    res.send(product);
});

router.post('/', function (req, res, next) {

    let product = req.body;
    product.id = _(products).map(p => p.id).max() + 1;
    products.push(product);

    res.send(OK);
});

router.put('/:id', function (req, res, next) {

    let productId = parseInt(req.params.id, 10);
    let _product = req.body;

    let _products = _.filter(products, p => p.id != productId);
    _products.push(_product);

    products = _.sortBy(_products,'id');

    res.send(OK);
});

router.delete('/:id', function (req, res, next) {

    let productId = parseInt(req.params.id, 10);
    products = _.filter(products, p => p.id != productId);

    res.send(OK);
});


router.init = function(_products) {

    products = _products;
    return router;

}


module.exports = router;