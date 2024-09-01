import mongoose from "mongoose";

const memberShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Membership = mongoose.model("membership", memberShipSchema);

export default Membership; // Exporting the model MemberShip
