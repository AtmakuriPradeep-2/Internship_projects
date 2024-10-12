// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, default: 'user' } // For role-based access control
});

const User = mongoose.model('User', userSchema);
module.exports = User;
