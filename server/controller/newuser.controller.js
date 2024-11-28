import NewMember from "../model/newuser.model.js";

// Add a single new user
const addNewUser = async (req, res) => {
  try {
    const { name, email, contact, address } = req.body;

    // Validate required fields
    if (!name || !email || !contact || !address) {
      return res.json({ msg: "All fields are required", status: false });
    }

    // Check if the email already exists
    const existingUser = await NewMember.findOne({ email });
    if (existingUser) {
      return res.json({
        msg: "User with this email already applied",
        status: false,
      });
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
    return res.json({ msg: "Internal server error", status: false });
  }
};

// Delete a single user by ID
const deleteNewUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is provided
    if (!id) {
      return res.json({ msg: "User ID is required", status: false });
    }

    // Find and delete the user based on the ID
    const deletedUser = await NewMember.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.json({ msg: "User not found", status: false });
    }

    return res.json({
      msg: "User deleted successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await NewMember.find();

    // Check if users exist
    if (!users.length) {
      return res.json({
        msg: "No users found",
        status: true,
        users: [],
      });
    }

    // Respond with user data
    return res.json({
      msg: "All users retrieved successfully",
      status: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    // Send error response
    return res.json({
      msg: "Internal server error",
      status: false,
    });
  }
};

export { addNewUser, deleteNewUser, getAllUsers };
