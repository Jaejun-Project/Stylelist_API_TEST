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

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}
