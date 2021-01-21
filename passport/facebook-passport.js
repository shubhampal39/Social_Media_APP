const passport = require('passport');
const keys = require('../config/keys');
const FacebookStrategy = require('passport-facebook')
const User = require('../models/user');
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


passport.use(new FacebookStrategy({
    clientID: keys.FacebookClientID,
    clientSecret: keys.FacebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id','displayName', 'name', 'photos', 'email'],
    proxy: true
},

        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            User.findOne({
                facebook: profile.id
            }).then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    const newUser = {
                        facebook: profile.id,
                        fullname: profile.displayName,
                        lastname: profile.name.familyName,
                        firstname: profile.name.givenName,
                        email: profile.emails[0].value,
                        image: 'https://graph.facebook.com/${profile.id}/picture?type=large'
                    }
                    // save new user into database
                    console.log("newUser.email",newUser.email);
                    new User(newUser).save()
                        .then((user) => {
                            done(null, user);
                        })
                }
            })
        }
));