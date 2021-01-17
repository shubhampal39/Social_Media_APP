const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
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
    clientID:keys.GoogleClientID,
    clientSecret: keys.GoogleClientSecret,
    callbackURL: "/auth/google/callback",
    // passReqToCallback: true,
    prooxy:true
  },
  (accessToken, refreshToken, profile,cb)=>{
      // console.log("Profile::::::::::::",profile);
      //storing to database
     User.findOne({
       google:profile.id//goggle is in user.js db
     }).then((user)=>{
       if(user){
         done(null,user);
       }else{
         const newUser={
           google:profile.id,
           fullname:profile.displayName,
           firstname:profile.name.givenName,
           lastname:profile.name.familyName,
           image:profile.photos[0].value
         }
         new User(newUser).save()
         .then((user)=>{
           done(null,user);
         })
       }
     })
  
    }


//   function(request, accessToken, refreshToken, profile, done) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
  //}
));