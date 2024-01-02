var mongoose = require('mongoose');
var plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/PinterestApp");

var userSchema =  mongoose.Schema({
  fullname:{ 
    type:String,
  },
  username:{ 
    type:String,
  },
  gmail:{ 
    type:String,
  },
  password:{ 
    type:String,
  },
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'posts'
    }
  ],
  dp:{ 
    type:String,
  },
})

userSchema.plugin(plm);

module.exports = mongoose.model("users",userSchema);

  
