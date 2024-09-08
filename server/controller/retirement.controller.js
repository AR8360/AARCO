import Retirment from "../model/retirment.model.js";

const addRetirment = async (req, res) => {
  try {
    const { name, image, date, content, order, contact } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }

    const retirment = new Retirment({
      name,
      image,
      date,
      contact,
      content,
      order,
    });

    await retirment.save();

    return res.json({ msg: "Retirment added successfully" });
  } catch (error) {
    console.error(`Add retirment error: ${error.message}`);

    return res.json({ msg: "Internal server error", status: false });
  }
};

const getRetirments = async (req, res) => {
  try {
    const retirments = await Retirment.find().sort({ order: 1 });

    return res.json({ retirments, status: true });
  } catch (error) {
    console.error(`Get retirments error: ${error.message}`);

    return res.json({ msg: "Internal server error", status: false });
  }
};

const deleteRetirment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ msg: "Retirment not Found" });
    }

    await Retirment.findByIdAndDelete(id);

    return res.json({ msg: "Retirment deleted successfully" });
  } catch (error) {
    console.error(`Delete retirment error: ${error.message}`);

    return res.json({ msg: "Internal server error", status: false });
  }
};

export { addRetirment, getRetirments, deleteRetirment };
