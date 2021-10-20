const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInfoSchema = new Schema({
  name: { type: String },
  avatar: { type: String },
  email: { type: String },
  phone: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('userInfoes', UserInfoSchema);