const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name     : String,
  email : { type: String, required: true },
  password : { type: String, required: true }
})

userSchema.methods.hashPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password, hash) {
  return bcrypt.compareSync(password, hash);
}

const user =  mongoose.model('user', userSchema);
module.exports = user;