const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.set('useFindAndModify', false);

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId, ref:'Stylelist'
      }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            console.log("password + : " + newUser.password);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePassword = function( candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

module.exports.getUsers = function(callback){
  User.find(callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//ad
module.exports.addFavorite = function(currentUser,id, callback){
  // console.log(currentUser);
  currentUser.save(currentUser, callback);
};

module.exports.removeFavorite = function(currentUser,callback){
    // console.log("inside Favorite");
   currentUser.save(currentUser, callback);
};

module.exports.isFavorite = function(currentUser, callback){

  User.findById(currentUser._id, callback).populate('favorites');
};
