import NewMember from "../model/newuser.model.js";

// Add a single new user
const addNewUser = async (req, res) => {
  try {
    const { name, email, contact, address } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !address) {
      return res
        .status(400)
        .json({ msg: "All fields are required", status: false });
    }

    // Check if the email already exists
    const existingUser = await NewMember.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already apply", status: false });
    }

    // Create a new user
    const newUser = new NewMember({ name, email, contact, address });

    // Save the new user to the database
    await newUser.save();

    return res.json({
      msg: "New user added successfully",
      status: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding new user:", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// Delete a single user by email
const deleteNewUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate if email is provided
    if (!email) {
      return res.status(400).json({ msg: "Email is required", status: false });
    }

    // Find and delete the user based on the email
    const deletedUser = await NewMember.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.json({ msg: "User not found", status: false });
    }

    return res.json({
      msg: "User deleted successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await NewMember.find();

    if (!users.length) {
      return res.json({ msg: "No users found", status: false });
    }

    return res.json({
      msg: "All users retrieved successfully",
      status: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

export { addNewUser, deleteNewUser, getAllUsers };
