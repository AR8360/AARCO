import Membership from "../model/merbership.model.js";

const addmember = async (req, res) => {
  try {
    const { name, image, email, order } = req.body;

    if (!name) {
      return res.json({ msg: "Name is required", status: false });
    }

    const member = new Membership({
      name,
      image,
      email,
      order: order || 10,
    });

    await member.save();

    return res.json({ msg: "Member added successfully", status: true });
  } catch (error) {
    console.error(`Add member error: ${error.message}`);

    return res.json({ msg: "Internal server error", status: false });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await Membership.find().sort({ order: 1 });

    return res.status(200).json({ members, status: true });
  } catch (error) {
    console.error(`Get members error: ${error.message}`);

    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.json({ msg: "Member not Found" });
    }

    await Membership.findByIdAndDelete(_id);

    return res.json({ msg: "Member deleted successfully" });
  } catch (error) {
    console.error(`Delete member error: ${error.message}`);

    return res.json({ msg: "Internal server error", status: false });
  }
};

export { addmember, getMembers, deleteMember };
