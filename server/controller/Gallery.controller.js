import Gallery from "../model/gallery.model.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery, {
      message: "Gallery fetched successfully",
      status: true,
    });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

export const addGallery = async (req, res) => {
  const { image } = req.body;
  const newGallery = new Gallery({ image });
  try {
    await newGallery.save();
    res.json({ message: "Gallery added successfully", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

export const deleteGallery = async (req, res) => {
  const { id } = req.params;
  try {
    await Gallery.findByIdAndDelete(id);
    res.json({ message: "Gallery deleted successfully", status: true });
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};
