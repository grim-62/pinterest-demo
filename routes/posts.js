const mongoose = require('mongoose');
// const { array } = require('./multer');

var postSchema = mongoose.Schema({
    caption:{
        type:String,
    },
    image:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    likes:{
        type:Array,
        default:[],
    },
})

module.exports = mongoose.model('posts',postSchema);