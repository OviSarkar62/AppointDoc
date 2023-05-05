const mongoose = require("mongoose");
const Joi = require("joi");

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
  timings: {
    type: Object,
    required: [true, "Work timing is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const doctorModel = mongoose.model("doctors", doctorSchema);

function validateDoctor(doctor) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    specialization: Joi.string().required(),
    experience: Joi.string().required(),
    feesPerConsultation: Joi.number().required(),
    timings: Joi.object().required(),
  });

  return schema.validate(doctor);
}

module.exports = {
  doctorModel,
  validateDoctor,
};
