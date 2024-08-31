import Member from "../model/member.model.js";
import { generateOTP, sendOTPEmail } from "../services/otpService.js";
import { addMinutes, isAfter } from "date-fns";
const login = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ msg: "Email is required", status: false });
    }

    const otp = generateOTP();
    const otpExpiry = addMinutes(new Date(), 10); // OTP valid for 10 minutes

    // Find user or create a new user and store OTP and expiration
    let user = await Member.findOne({ email });
    if (!user) {
      user = new Member({ email });
    }

    // Temporarily store OTP and expiration time (adjust storage logic as needed)
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send the OTP to the user's email
    await sendOTPEmail(email, otp);

    return res.json({
      msg: "OTP sent successfully. Check your email.",
      status: true,
    });
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    return res.json({ msg: "Internal server error", status: false });
  }
};

const signup = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email input
    if (!email) {
      return res.status(400).json({ msg: "Email is required", status: false });
    }

    const user = await Member.create({ email });

    // Successful response with user details
    return res.status(200).json({ status: true, user });
  } catch (error) {
    console.error(`Signup error: ${error.message}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await Member.findOne({ email });

    // Check if the user exists and if OTP matches and is not expired
    if (!user || user.otp !== otp || isAfter(new Date(), user.otpExpiry)) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    // Clear OTP and expiration after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return res
      .status(200)
      .json({ msg: "OTP verified successfully. You are logged in!" });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export { login, signup, verifyOTP };
