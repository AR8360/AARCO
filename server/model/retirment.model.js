import mongoose from "mongoose";

const RetirmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

const Retirment = mongoose.model("Retirment", RetirmentSchema);

export default Retirment; // Exporting the model MemberShip
