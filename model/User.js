const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
      type: String,
      required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
      },
      image:{
        type: String,
        required: true
      },
      password:{
        type: String,
        required: true
      },
      accountType:{
        type: String,
      enum: ['Admin', 'User',"Seller"], 
      required: true
      },
      token:{
        type: String, 
      },
      profileDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
      },
      products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true 
      }]

    
  });
  
  module.exports = mongoose.model('User', userSchema);
  
  
  