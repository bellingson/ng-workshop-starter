var express = require('express');

var router = express.Router();

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    
            console.debug('login: ' + username + ' : ' + password);

            let user = { username: username };

            return done(null, user);


    }));

router.get('/', function(req, res) {

    res.render('login');

});

router.post('/', passport.authenticate('local'), function(req, res) {

    console.log('do login')


    res.redirect('/');

});

/*
router.post('/', passport.authenticate('local'), function(req, res) {

    console.log('do login')


    res.redirect('/');

});
*/


module.exports = router;