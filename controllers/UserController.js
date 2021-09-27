const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const passport = require('passport');


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
    },
    reset(req, res){
        res.render('pages/resetPassword')
    },

    forget(req, res){
        res.render('pages/forgetPassword')
    },

    userLogin(req, res){
        res.render('pages/login')
    },

    async sendPasswordResetToken (req, res) {
        let errors = [];
        try {
              // check if email exists
         const user = await User.findOne({where: {email: req.body.email}});
         if(!user){
             errors.push({msg: 'User with given email does not exits'});
         res.render('forgotPassword', {errors});
         }else{
             // find token
             let token =  await Token.findOne({where: {user_id: user.id}})
             if(!token){
                 token = await Token.create({
                     user_id : user.id,
                     token : crypto.randomBytes(32).toString('hex')
                 })
             }
             const link = `localhost:3000/reset-password/${user.id}/${token.token}`;
             await SendMail(user.email, 'Password-Reset', link);
             res.render('forgotPassword', {success_msg: 'password reset link sent to your email account'});
         }
        } catch (error) {
            console.log(error)
        }
       
 
     },
 
     // update password
     async renderPasswordForm (req, res){
         try {
             const user = await User.findByPk(req.params.user_id);
             if(!user){
                 res.render('forgotPassword', {error_msg: 'invalid link or expired token'});
             }
 
             const token = await Token.findOne({where: {
                 user_id : user.id,
                 token: req.params.token
             }})
             if(!token){
                 res.render('forgotPassword', {error_msg: 'invalid link or expired token'});
             }
             res.render('changepassword', {user_id: user.id});
         } catch (error) {
             console.log(error);
         }
     },
 
     async passwordUpdate(req, res){
         try {
             // find the user
         const user = await User.findByPk(req.params.user_id);
         if (!user) {
             res.render('forgotPassword', {error_msg: 'An error has occoured, please try again'});
         }
         const {password, password_confirm} = req.body;
         let errors = [];
         if (!password || !password_confirm) {
             errors.push({msg: 'please fill in all fields'});
         }
           // check password match
         if(password !== password_confirm){
             errors.push({msg: 'passwords do not match'})
         }
         if(password.length < 6){
             errors.push({msg: 'password should be at least 6 characters'});
         }
         if(errors.length > 0){
             res.render('changepassword', {errors});
         }else{
             // hash password before save
             bcrypt.genSalt(10, (err, salt) => {
                 bcrypt.hash(password, salt, (err, hash)=> {
                     user.password = hash
                     user.save();
                 })
                 res.render('login', {success_msg: 'password updated'})
             })
         
         }
 
         } catch (error) {
             console.log(error);
         }
     }
 

}
module.exports = UserController;