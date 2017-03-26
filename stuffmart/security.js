var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var session = require('express-session');

var _ = require('lodash');

function configure(app) {

    var users = [
        { id: 1, username: 'admin', password: 'admin' }
    ];

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }));

    passport.use(new LocalStrategy({ passReqToCallback : true},
        function(req, username, password, done) {

            console.log('authenticate: ' + username + ' : ' + password);

            let user = _.find(users, _user => _user.username == username);
            if(user && user.password == password) {
                return done(null, user);
            }

            return done(null, false, { message: 'Incorrect username or password.' });
        }
    ));


    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {

        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        let user = _.find(users, _user => _user.id === id);

        done(null,user);

    });


    function ensureAuthenticated(req, res, next) {

        // console.log('ensure authenticated');

        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login')
    }

    app.post('/login', passport.authenticate('local', { successRedirect: '/admin/',
                                                        failureRedirect: '/login' }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/admin/*', ensureAuthenticated);

    // leaving unsecured for demo
    // app.get('/api/*', ensureAuthenticated);

}

module.exports = {
    configure : configure
};


