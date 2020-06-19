const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
// const User = require('/user');
// mongoose.set('useFindAndModify', false);
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

