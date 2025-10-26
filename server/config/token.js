// utils/token.js
import jwt from "jsonwebtoken";

const genToken = (userId) => {
  try {
    console.log("🔑 Generating token for user:", userId);
    console.log("🔐 JWT_SECRET exists:", !!process.env.JWT_SECRET);
    console.log("🔐 JWT_SECRET value:", process.env.JWT_SECRET ? "Set" : "MISSING!");
    
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    
    const token = jwt.sign(
      { userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );
    
    console.log("✅ Token generated successfully");
    return token;
  } catch (error) {
    console.error("❌ Token Generation Error:", error.message);
    throw error; 
  }
};

export default genToken;
