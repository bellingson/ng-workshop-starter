var express = require('express');
var router = express.Router();

var hbs = require('hbs');
var currencyFormatter = require('currency-formatter');

var _ = require('lodash');

let products;

/* GET home page. */
router.get('/', function(req, res, next) {	
  res.render('index', { products: products, user: req.user });
});

router.get('/product/:id', function(req, res, next) {

    let id = parseInt(req.params.id, 10);
    let product = _.find(products, product => product.id === id);

    res.render('product', { product: product, user: req.user });
});

router.init = function(_products) {

    products = _products;
    return router;

}


hbs.registerHelper('currency', function(number) {
    return currencyFormatter.format(number, { code: 'USD' });
});

hbs.registerHelper('summary', function(text) {
    if(text == null)
        return '';

    if(text.length < 80)
        return text;

    return text.substring(0, 80);

});



module.exports = router;
