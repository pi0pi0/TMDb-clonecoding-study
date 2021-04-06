const mongoose = require('mongoose'); 
const { Schema } = require("mongoose");

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId :{
        type: String
    },
    movieTitle :{
        type: String
    },
    moviePost:{
        type: String
    },
    movieRunTime:{
        type: String
    }
}, {timestamps: true}) // timestamps 자동생성 
 
const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }