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
  email: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    required: true,
    default: 10,
  },
});

const Membership = mongoose.model("membership", memberShipSchema);

export default Membership; // Exporting the model MemberShip
