import jwt from "jsonwebtoken";

export const generateJWT = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    status: user.status,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return token;
};
