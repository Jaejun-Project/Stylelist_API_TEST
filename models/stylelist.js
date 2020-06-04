const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
// const User = require('/user');
mongoose.set('useFindAndModify', false);
const StylelistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    favoritesCount: {
        type: Number,
        default: 0
    },
    tag: [{type: String}]
});


const Stylelist = mongoose.model('Stylelist', StylelistSchema);
module.exports = Stylelist;


//show

module.exports.addStylelist = function(newStylelist, callback){
    newStylelist.save(callback);
}

//get stylelists
module.exports.getStylelists = function(callback){
  Stylelist.find(callback);
}


module.exports.getStylelistByTag = function(tag, callback){
  const query = { tag: tag };
    Stylelist.find(query, callback);
}

module.exports.addFavoritesCount = function(id, callback){
Stylelist.findOneAndUpdate(  { _id: id },{ $inc: { "favoritesCount" : 1 } } , callback);

}
module.exports.removeFavoritesCount = function(id, callback){
Stylelist.findOneAndUpdate({ _id: id },{ $inc: { "favoritesCount" : -1 } } , callback);
}
