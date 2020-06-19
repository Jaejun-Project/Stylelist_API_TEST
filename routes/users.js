const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const passport = require('passport');
const bcrypt = require('bcrypt');



// module.exports.addUser = function(newUser, callback){
//     bcrypt.genSalt(10,(err, salt)=>{
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if(err) throw err;
//             console.log("password + : " + newUser.password);
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// }
router.post('/register', async (req, res) => {

    try{
        let newUser = new User ({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });
        //Add hash to password
            const saltRounds = 10;
            const salt =  bcrypt.genSaltSync(saltRounds);
            const hash =  bcrypt.hashSync(newUser.password, salt);
            newUser.password =  hash;
            console.log(newUser.password);
            const user = await newUser.save();
            res.json(user);
     }
    catch(err){
        return res.json({success: false, msg: err.message});
    }
});

router.get('/', async (req,res) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(err){
        res.status(400).json(err);
    }
});

router.post('/authenticate', async (req,res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // const query = {username: username};
    // User.findOne(query, callback);
    try{
        const user =  await User.findOne({username: username});
        const isMatch =  await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if(isMatch){
            // console.log("from user.js "  + config.secret);
            // console.log(user);
            const token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 604800 // 1 week
            });
            return res.json({
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
    }catch{
        return res.status(404).json({ success: false, msg: 'User not found'}); 
    }
});

router.get('/profile', passport.authenticate('jwt',{session: false}),  (req, res) => {
    // res.send("This is profile page");
    console.log("Hello" + req.user);
    res.json({user: req.user});
});


module.exports = router;
