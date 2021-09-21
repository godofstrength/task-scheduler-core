const User = require('../models/User')

const UserController = {
        // passport Login
    login (req, res, next){
        passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
        })(req, res, next);
    }, 
    logout (req, res) {
        req.logout();
        req.flash('success_msg', 'Logout successful');
        res.redirect('/')
    }

}
module.exports = UserController;