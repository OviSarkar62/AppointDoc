const mongoose = require("mongoose");
const Joi = require('joi');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, 'Your first name must be at least 2 characters'],
    maxlength: [50, 'Your first name cannot exceed 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, 'Your last name must be at least 2 characters'],
    maxlength: [50, 'Your last name cannot exceed 50 characters'],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required"],
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
  },
  feesPerConsultation: {
    type: Number,
    required: [true, "Fee is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
  starttime: {
    type: String,
    required: [true],
  },
  endtime: {
    type: String,
    required: [true],
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const docSchema = Joi.object({
  userId: Joi.string(),
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
  website: Joi.string(),
  address: Joi.string().required(),
  specialization: Joi.string().required(),
  experience: Joi.string().required(),
  feesPerConsultation: Joi.number().required(),
  status: Joi.string().default('pending'),
  starttime: Joi.string().required(),
  endtime: Joi.string().required(),
  createdAt: Joi.date().default(Date.now),
});

// Add the Joi validation to the Mongoose schema
doctorSchema.validateDoctor = async function () {
  return docSchema.validateAsync(this.toObject());
};

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
