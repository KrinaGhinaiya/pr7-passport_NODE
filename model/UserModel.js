const mongoose = require('mongoose');
const { type } = require('os');

const userSchema =new mongoose.Schema({

    name:{
      type:String,
    },

    email:{
        type:String,
      },

    password:{
        type:String,
      },
});

const user = mongoose.model('user',userSchema);

module.exports = user;