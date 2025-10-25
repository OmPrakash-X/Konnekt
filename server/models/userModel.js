import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
    maxlength: 200,
  },

  phone: {
    type: String,
  },

  //  Email Verification
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpires: {
    type: Date,
  },

  //  Skill & Reputation System
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],

  //  Wallet for Credit Token System
  walletBalance: {
    type: Number,
    default: 0,
  },

  //  Location for Geo Matching
  location: {
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    city: { type: String },
    area: { type: String },
  },

  //  Accessibility + Inclusivity Support
  accessibility: {
    highContrast: { type: Boolean, default: false },
    voiceControl: { type: Boolean, default: false },
    language: { type: String, default: "en" },
  },

  //  Role 
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
