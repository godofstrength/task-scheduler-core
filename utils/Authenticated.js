// auth guard middleware
module.exports = {
    ensureAuthenticated : (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg','You need to login to continue');
            res.redirect('/');
        }
    }
}