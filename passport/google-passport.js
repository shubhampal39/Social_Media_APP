const passport=require('passport');
const googleStrategy=require('passport-google-oauth20').Strategy;
const User=require('../models/user');
const keys=require('../config/keys');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



passport.use(new GoogleStrategy({
    clientID:keys.GoogleClientId,
    clientSecret: keys.GoogleClientSecret,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true,
    prooxy:true
  },
  (accessToken, refreshToken, profile,cb)=>{
      console.log(profile);
  }

//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
  //}
));