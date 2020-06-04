const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');

// passport.authenticate('jwt', {session:false})

// app.get('validate',)

router.post('/register', (req, res, next) => {
    let newUser = new User ({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

   User.addUser(newUser, (err, newUser) => {
       if (err) {
            console.log("err occured ");
            res.json({success: false, msg:'Failed to register user'});
       }else {
            res.json({success: true, msg: 'User registered'});
       }
   });
});

router.get('/', (req,res, next) =>{
  User.getUsers( function(err, users){
    if(err){
      console.log(err);
    }else{
      res.json(users);
    }
  });
});

router.post('/authenticate', (req,res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({ success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                // console.log("errorrorro");
                throw err; }
            if(isMatch){
                console.log("from user.js "  + config.secret);
                // console.log(user);
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: token,
                    // reconstruct the user to hide password
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    // res.send("This is profile page");
    console.log("heelo" + req.user);
    res.json({user: req.user});
});


module.exports = router;
