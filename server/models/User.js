const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String },
  password: { type: String },
  userType: { type: Number },
  info: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('users', UserSchema);