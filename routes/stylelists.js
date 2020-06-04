const express = require('express');
const router = express.Router();
const Stylelist = require('../models/stylelist');
const User = require('../models/user');
const config = require('../config/database');
const passport = require('passport');


//register new style into stylelist
router.post('/register', (req, res, next) => {
    let newStylelist = new Stylelist ({
        title: req.body.title,
        imagePath: req.body.imagePath,
        description: req.body.description,
        favoritesCount: req.body.favoritesCount,
        tag: req.body.tag
    });
   Stylelist.addStylelist(newStylelist, (err, newStylelist) => {
       if (err) {
            console.log("err occured ");
            res.json({success: false, msg:'Failed to add new styles'});
       }else {
            res.json({success: true, msg: 'added new styles'});
       }
   });
});


// only logged in user can add stylelist to favorite list
router.post('/:id/favorites/add', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
  let stylelistId = req.body._id;
  let currentUser = req.user;
  // console.log(stylelistId);
  if(stylelistId == null){
    res.json({success: false, msg: "empty data"})
  }
//check whether stylelist is already added to favoriete list
  if(currentUser.favorites.indexOf(stylelistId) === -1){
    currentUser.favorites.push(stylelistId);

    //increase favorite count by 1
    Stylelist.addFavoritesCount(stylelistId, (err, stylelistId) =>{
      if(err){
        console.log("err occured");
        res.json({success: false, msg: "error from add favorite count"});
      }else{
        res.json({success: true, msg: 'Increased favorites count by 1'});
      }
    });

    //add stylelist to user's favorite list
    User.addFavorite(currentUser, (err, currentUser) =>{
      if(err){
        res.json({success: false, msg: "err from addFavor"});
      }else{
        res.json({
          success: true,
          msg: "add to favorite list",
          user: {
              id: currentUser._id,
              name: currentUser.name,
              username: currentUser.username,
              email: currentUser.email,
              favorites: currentUser.favorites
          }
        });
      }
    });
  }else{
    res.json({success: false, msg: "already in the favorite list"});
  }
});

//remove from fav list

router.post('/:id/favorites/remove', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
  let stylelistId = req.body._id;

  let currentUser = req.user;
  if(stylelistId == null){
    res.json({success: false, msg: "empty data"})
  }
  if(currentUser.favorites.indexOf(stylelistId) >= 0){
    currentUser.favorites.pull(stylelistId);
    console.log("hihi");
    Stylelist.removeFavoritesCount(stylelistId, (err, stylelistId) =>{

        if(err){
          console.log("err occured");
          res.json({success: false, msg: "error from descreasing favorite count"});
        }else{
          res.json({success: true, msg: 'Decreased favorites count by 1'});
        }
      });

      User.removeFavorite(currentUser, (err, currentUser) =>{
        if(err){
          res.status(400).json({success: false, msg: "err from delete fav"});
        }else{
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
      });
  }else{
    res.json({success: false, msg: "already in the favorite list"});
  }
});


//show all favorite list of current user
router.get('/:id/favorites', passport.authenticate('jwt', {session:false}), (req,res,next)=>{
  let stylelistId = req.body._id;
  let currentUser = req.user;
  // console.log(stylelistId);
  User.isFavorite(currentUser, (err, currentUser) =>{
    if(err){
        res.json({success: false, msg: "err"});
    }else{
      res.json({
        success: true,
        msg: "Display user's favorite stylelist",
        username: currentUser.username,
        favorites: currentUser.favorites
       });
    }
  })
});



//show all stylelists
router.get('/', (req,res, next) =>{
  Stylelist.getStylelists( function(err, stylelists){
    if(err){
      console.log(err);
    }else{
      res.json(stylelists);
    }
  });
});

//show stylelists by tag name
router.get('/tag', (req, res, next) =>{
  let stylelistByTag = req.body.tag;
  Stylelist.getStylelistByTag(stylelistByTag, function(err, stylelistByTag){
    if(err){
      console.log(err);
      res.json({success: false, msg: "does not exist or something went wrong"});
    }else{
      res.json(stylelistByTag);
    }
  });
});

module.exports = router;
