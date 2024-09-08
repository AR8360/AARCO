import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
});

const Pdf = mongoose.model("Pdf", pdfSchema);

export default Pdf;
