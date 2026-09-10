const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      default: 'student',
    },
    phone: {
      type: String,
      default: ''
    },
    department: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    profilePic: {
      type: String,
      default: ''
    },
    feePaid: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
