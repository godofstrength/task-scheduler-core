const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({
            usernameField : 'email',
            passwordField: 'password' 
    }, (email, password, done) => {
            User.findOne({where: {email: email}})
            .then(user => {
                if(!user){
                    return done(null, false, {message: 'That email is not registered'})
                }
                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user, {message: 'success'});
                    }else {
                        return done(null, false, {message: 'Password incorrect'});
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      // deserialize user 
    passport.deserializeUser(function(id, done) {
 
    User.findByPk(id).then(function(user) {
 
        if (user) {
 
            done(null, user.get());
 
        } else {
 
            done(user.errors, null);
 
        }
 
    });
 
});
}
