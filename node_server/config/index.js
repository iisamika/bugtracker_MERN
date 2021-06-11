const passport = require('passport');
const LocalPassportStrategy = require('./LocalPassportStrategy');
const LoginData = require('../models/login');

passport.serializeUser((user, done) => {
    done(null, { _id: user._id });
});


passport.deserializeUser((id, done) => {
    LoginData.findOne({ _id: id }, 'userName', function (err, user) {
        console.log('Deserialize user:', user);
        done(null, user);
    });
});

passport.use(LocalPassportStrategy);

module.exports = passport;