import genToken from "./token.js";

export const sendToken = (user, statusCode, message, res) => {
  const token = genToken(user._id);
  
  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
    secure: process.env.NODE_ENV === "production", 
  };
  
  console.log("🍪 Setting cookie with options:", cookieOptions);
  
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      message,
      token,
    });
};
