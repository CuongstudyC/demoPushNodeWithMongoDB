const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  email: String,
  password:String,
  fullname: String,
  phone: String
})

module.exports = mongoose.model('users',userModel);