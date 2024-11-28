import mongoose from "mongoose";

const unregistermemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Employee: {
    type: String,
    required: true,
  },
  Unit: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  OfficeIntercom: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  verifiedemail: {
    type: Boolean,
    default: false,
  },
  otpExpiry: {
    type: Date,
  },
});

const UnRegister = mongoose.model("unregisterMember", unregistermemberSchema);

export default UnRegister; // Exporting the model UnRegister
