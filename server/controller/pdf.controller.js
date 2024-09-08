import Pdf from "../model/pdf.model";

const getPdf = async (req, res) => {
  try {
    const pdf = await Pdf.find();
    res.json({ pdf: pdf, status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const createPdf = async (req, res) => {
  const pdf = new Pdf({
    name: req.body.name,
    link: req.body.link,
    order: req.body.order,
  });

  try {
    const newPdf = await pdf.save();
    res.json(newPdf, { status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

const deletePdf = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({ message: "Id is required", status: false });
  }
  try {
    await Pdf.findByIdAndDelete(id);
    res.json({ message: "Pdf deleted", status: true });
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

export { getPdf, createPdf, deletePdf };
