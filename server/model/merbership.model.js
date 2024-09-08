import mongoose from "mongoose";

const memberShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  contact: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    default: 10,
  },
});

const Membership = mongoose.model("membership", memberShipSchema);

export default Membership; // Exporting the model MemberShip
