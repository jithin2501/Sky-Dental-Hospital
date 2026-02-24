const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // Optional phone field from image
  message: { type: String, required: true },
  receivedOn: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Message', MessageSchema);