import Member from "../model/member.model.js";
import UnRegister from "../model/Unregister.model.js";
import {
  generateOTP,
  sendOTPEmail,
  sendemailapprove,
} from "../services/otpService.js";
import { isAfter } from "date-fns";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/generatejwt.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email input
    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }

    // Find user or create a new user and store OTP and expiration
    let user = await Member.findOne({ email });
    if (!user) {
      return res.json({
        msg: "User not found. Please sign up.",
        status: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ msg: "Invalid password", status: false });
    }
    const token = generateJWT(user);
    res.cookie("token", token, {
      httpOnly: true, // Helps prevent XSS attacks by making the cookie inaccessible via JavaScript
      secure: true, // Ensures the cookie is only sent over HTTPS
      sameSite: "none", // Allows the cookie to be sent in cross-site requests (Netlify frontend to Render backend)
      maxAge: 15 * 60 * 1000, // 30 days (in milliseconds)
    });

    return res.json({
      msg: "You are logged in!",
      status: true,
    });
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const register = async (req, res) => {
  try {
    const { name, Employee, Unit, email, password, OfficeIntercom, otp } =
      req.body;

    // Validate required fields
    if (!name || !Employee || !Unit || !email || !password || !OfficeIntercom) {
      return res.json({ msg: "All fields are required", status: false });
    }

    let user = await Member.findOne({ email });
    if (user) {
      return res.json({
        msg: "Email already exists. Please login.",
        status: false,
      });
    }

    // Check if the email is already registered as a member
    let existingUser = await UnRegister.findOne({ email });
    if (existingUser) {
      if (otp.length > 0 && existingUser.otp === otp) {
        if (isAfter(new Date(), existingUser.otpExpiry)) {
          await UnRegister.deleteOne({ email });
          return res.json({
            msg: "OTP expired.Re-Register yourself.",
            status: false,
          });
        }

        // Clear OTP and expiration after successful verification
        existingUser.otp = null;
        existingUser.otpExpiry = null;
        existingUser.verifiedemail = true;
        await existingUser.save();

        return res.json({
          msg: "OTP verified successfully.Admin will notify you upon acceptance through mail.",
          status: true,
        });
      } else if (otp.length > 0 && existingUser.otp !== otp) {
        return res.json({ msg: "Invalid OTP", status: false });
      }
      await UnRegister.findOneAndDelete({ email });
      return res.json({
        msg: "Email already exists.Please Re-register yourself to verify it.",
        status: true,
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new unverified user in the UnRegister model
    const newUnRegisterUser = new UnRegister({
      name,
      Employee,
      Unit,
      email,
      password: hashedPassword,
      OfficeIntercom,
      verifiedemail: false,
    });

    // Save the unverified user to the UnRegister model
    await newUnRegisterUser.save();

    // Send OTP for email verification
    const newotp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes

    // Save OTP and expiry date to the user
    newUnRegisterUser.otp = newotp;
    newUnRegisterUser.otpExpiry = otpExpiry;
    await newUnRegisterUser.save();

    // Send OTP to user's email
    await sendOTPEmail(newUnRegisterUser.email, newotp);

    return res.json({
      msg: "Registration successful. Please verify your email with the OTP sent.",
      status: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const generateMemberOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Member.findOne({ email });

    // Check if the member exists
    if (!user) {
      return res.json({
        msg: "Member not found.SignUp for new member",
        status: false,
      });
    }

    // Generate OTP and set expiration time
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes

    // Save OTP and expiry to the member model
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP to member's email
    await sendOTPEmail(user.email, otp);

    return res.json({
      msg: "OTP sent to your email. Please verify.",
      status: true,
    });
  } catch (error) {
    console.error("OTP generation error:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const verifyMemberOTP = async (req, res) => {
  const { email, password, otp } = req.body;

  try {
    const user = await Member.findOne({ email });

    // Check if the member exists and if OTP matches
    if (!user || user.otp !== otp) {
      return res.json({ msg: "Invalid or expired OTP", status: false });
    }

    // Check if the OTP has expired
    if (isAfter(new Date(), user.otpExpiry)) {
      // Clear the expired OTP and inform the user
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      return res.json({
        msg: "OTP expired. Please request a new one.",
        status: false,
      });
    }

    // Clear OTP after successful verification
    user.otp = null;
    user.otpExpiry = null;
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({
      msg: "OTP verified successfully.Your Password as been restart.",
      status: true,
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

// Admin approves user registration and moves to Member model
const approveUser = async (req, res) => {
  try {
    const { emails } = req.body; // Expecting an array of emails

    // Validate emails input
    if (!emails || !Array.isArray(emails)) {
      return res
        .status(400)
        .json({ msg: "An array of emails is required", status: false });
    }

    // Iterate over each email to approve the users
    for (const email of emails) {
      // Find the unverified user by email
      const unverifiedUser = await UnRegister.findOne({ email });
      if (!unverifiedUser) {
        continue; // Skip this email if the user is not found
      }

      // Create a new Member from the unverified user
      const newMember = new Member({
        name: unverifiedUser.name,
        Employee: unverifiedUser.Employee,
        Unit: unverifiedUser.Unit,
        email: unverifiedUser.email,
        password: unverifiedUser.password,
        OfficeIntercom: unverifiedUser.OfficeIntercom,
        status: "member", // Set status to member
      });

      // Save the new member to the Member model
      await newMember.save();
      sendemailapprove(newMember.email);

      // Remove the user from UnRegister collection
      await UnRegister.deleteOne({ email });
    }

    return res.json({
      msg: "Users approved and moved to the members section.",
      status: true,
    });
  } catch (error) {
    console.error("Error approving users:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const allunregisterUser = async (req, res) => {
  try {
    // Find all unregistered users but exclude password, otp, otpExpiry, and status
    const unregister = await UnRegister.find({ verifiedemail: true }).select(
      "-password -otp -otpExpiry -status"
    ); // Excluding specified fields

    return res.json({ unregister });
  } catch (error) {
    console.error("Error fetching unregistered users:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const deleteUnregisterUser = async (req, res) => {
  try {
    const { email } = req.query; // Read email from query parameters
    console.log(email);

    // Validate if email is provided
    if (!email) {
      return res.status(400).json({ msg: "Email is required", status: false });
    }

    // Find and delete the unregistered user based on email
    const deletedUser = await UnRegister.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.json({ msg: "User not found", status: false });
    }

    return res.json({
      msg: "Unregistered user deleted successfully.",
      status: true,
    });
  } catch (error) {
    console.error("Error deleting unregistered user:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const changeMemberStatusToAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ msg: "Email is required", status: false });
    }

    // Find the member by email
    const member = await Member.findOne({ email });
    if (!member) {
      return res.json({ msg: "Member not found", status: false });
    }

    // Check if the member is already an admin
    if (member.status === "admin") {
      return res.json({ msg: "User is already an admin", status: false });
    }

    // Change the status to admin
    member.status = "admin";
    await member.save();

    return res.json({
      msg: "Member status changed to admin successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error changing member status:", error.message);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res.json({ msg: "Logged out successfully", status: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res.json({ msg: "Internal server error", status: false });
  }
};

export {
  login,
  register,
  generateMemberOTP,
  verifyMemberOTP,
  allunregisterUser,
  deleteUnregisterUser,
  approveUser,
  changeMemberStatusToAdmin,
  logout,
};
