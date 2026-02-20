const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
  },

  content: {
    type: String,
    required: true,
  },

  messageType: {
    type: String,
    enum: ["text", "image", "file"],
    default: "text",
  },

  isRead: {
    type: Boolean,
    default: false,
  },

  readAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Message", messageSchema)
