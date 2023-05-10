const mongoose = require('mongoose');
const Joi = require('joi');
const zxcvbn = require('zxcvbn');

// Define a schema for user input validation
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
    .min(8)
    .max(128)
    .required(),
  isAdmin: Joi.boolean().optional(),
  isDoctor: Joi.boolean().optional(),
  notification: Joi.array().items(Joi.object({
    type: Joi.string().required(),
    message: Joi.string().required(),
    data: Joi.object({
      doctorId: Joi.string(),
      name: Joi.string(),
      onClickPath: Joi.string(),
    }).optional(),
    createdAt: Joi.date().required(),
  })).optional(),
  seennotification: Joi.array().items(Joi.object({
    type: Joi.string().required(),
    message: Joi.string().required(),
    data: Joi.object({
      doctorId: Joi.string(),
      name: Joi.string(),
      onClickPath: Joi.string(),
    }).optional(),
    createdAt: Joi.date().required(),
  })).optional(),
});


// Create a Mongoose schema
const userMongooseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minlength: [2, 'Your name must be at least 2 characters'],
    maxlength: [50, 'Your name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: [
      {
        validator: function (value) {
          const passwordStrength = zxcvbn(value).score;
          return passwordStrength >= 3; // Require a minimum strength of 3 out of 4
        },
        message: 'Password is too weak',
      },
      {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value);
        },
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    ],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  seennotification: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add the Joi validation to the Mongoose schema
userMongooseSchema.validateUser = async function (user) {
  return userSchema.validateAsync(user);
};

// Create a Mongoose model
const User = mongoose.model('User', userMongooseSchema);

// Export the model
module.exports = User;