import mongoose from "mongoose";

const newmemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const NewMember = mongoose.model("newmember", newmemberSchema);

export default NewMember; // Exporting the model Member
