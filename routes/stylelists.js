const express = require('express');
const router = express.Router();
const Stylelist = require('../models/stylelist');
const User = require('../models/user');
const config = require('../config/database');
const passport = require('passport');


//register new style into stylelist
router.post('/register', async (req, res) => {
 
  try{
    let newStylelist = new Stylelist ({
      title: req.body.title,
      imagePath: req.body.imagePath,
      description: req.body.description,
      favoritesCount: req.body.favoritesCount,
      tag: req.body.tag
    });
    const stylelist = await newStylelist.save();
    console.log(stylelist);
    res.json({success: true, msg: 'added new styles'});
  }
  catch(err){
    console.log("err occured ");
    res.json({success: false, msg:'Failed to add new styles'});
  }
});


// only logged in user can add stylelist to favorite list
router.post('/:id/favorites/:favId', passport.authenticate('jwt', {session:false}), async (req,res)=>{
  let stylelistId = req.params.favId;
  let currentUser = req.user;

  try{
    if(stylelistId == null){
      throw err;
    }

    if(currentUser.favorites.indexOf(stylelistId) === -1){
      currentUser.favorites.push(stylelistId);
      await currentUser.save();
      await Stylelist.findOneAndUpdate({ _id: stylelistId },{ $inc: { "favoritesCount" : 1 } });
      res.status(200).json({
        success: true,
        msg: "add from favorite list",
        user: {
          id: currentUser._id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          favorites: currentUser.favorites
      }
      });
    }
    else{
      throw err;
    }
  }catch (err){
    res.json(err);
  }
});

//remove from fav list

router.delete('/:id/favorites/:favId', passport.authenticate('jwt', {session:false}), async(req,res)=>{
  let stylelistId = req.params.favId;
  let currentUser = req.user;

  try{
    if(stylelistId == null){
      throw err;
    }
    if(currentUser.favorites.indexOf(stylelistId) >= 0){
      currentUser.favorites.pull(stylelistId);
      await currentUser.save();
      await Stylelist.findOneAndUpdate({ _id: stylelistId },{ $inc: { "favoritesCount" : -1 } });
      res.status(200).json({
        success: true,
        msg: "remove from favorite list",
        user: {
          id: currentUser._id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          favorites: currentUser.favorites
      }
      });
    }
    else{
      throw err;
    }

  }catch(err){
     res.json(err.message);
  }

});

router.get('/:id/favorites', passport.authenticate('jwt', {session:false}), async (req,res)=>{
  let stylelistId = req.params.id;
  // let currentUser = req.user;
  try{
    stylelistId
    let currUserFavorites = await User.findById(stylelistId).populate('favorites');
    res.status(200).json({
      success: true,
      msg: "Display user's favorite stylelist",
      username: currUserFavorites.username,
      favorites: currUserFavorites.favorites
     });
  }
  catch(err){
    res.status(400).json(err.message);
  }
});

//show all stylelists
router.get('/', async (req,res, next) =>{
  try{
    const stylelists =  await Stylelist.find();
    console.log(stylelists);
    res.status(200).json(stylelists);
  }catch(error){
    console.log('Error', error.message);
    res.json('Error', error.message);
  }
});

//show stylelists by tag name
router.get('/:tag', async (req, res, next) =>{
  let tag = req.params.tag;
  try{
    let stylelistByTag = await Stylelist.find({tag: tag});
    console.log(stylelistByTag);
    if(stylelistByTag.length <=0 ){
      res.status(404).json("Not exist")
    }else{
      res.status(200).json(stylelistByTag);
    }
  }catch(error){
    console.log(err);
    res.status(400).json({success: false, msg: "does not exist or something went wrong"});
  }
});

module.exports = router;
