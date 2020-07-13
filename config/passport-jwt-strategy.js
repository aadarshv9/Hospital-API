const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

// defining secret Key for decrypting JWT
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret_key'
}

// verifying the JWT and setting user in req
passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    // fetching doctor using jwtPayLoad
    Doctor.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);  // telling passport that doctor found
        }else{

            return done(null, false); // telling passport that doctor not found
        }
    })

}));

module.exports = passport;
