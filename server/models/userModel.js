import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
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
      trim: true,
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
      maxlength: 500,
    },

    phone: {
      type: String,
      trim: true,
    },

    // ===== EMAIL VERIFICATION =====
    isVerified: {
      type: Boolean,
      default: false,
    },

    // OTP Fields for Email Verification & Password Reset
    resetOtp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },

    // ===== SKILL & REPUTATION SYSTEM =====
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    // Skills user wants to learn
    learningNeeds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    completedSessions: {
      type: Number,
      default: 0,
    },

    badges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],

    // ===== WALLET & CREDIT TOKEN SYSTEM =====
    walletBalance: {
      type: Number,
      default: 100, // Starting credits for new users
      min: 0,
    },

    totalEarnings: {
      type: Number,
      default: 0,
    },

    totalSpent: {
      type: Number,
      default: 0,
    },

    // ===== LOCATION FOR GEO MATCHING =====
    location: {
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
      city: { type: String, trim: true },
      area: { type: String, trim: true },
      country: { type: String, default: "India" },
    },

    // ===== ACCESSIBILITY + INCLUSIVITY SUPPORT =====
    accessibility: {
      highContrast: { type: Boolean, default: false },
      voiceControl: { type: Boolean, default: false },
      language: { type: String, default: "en" },
      fontSize: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium",
      },
    },

    // ===== AVAILABILITY & PREFERENCES =====
    availability: {
      days: [
        {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
        },
      ],
      timeSlots: [
        {
          start: String, // "09:00"
          end: String, // "17:00"
        },
      ],
      timezone: {
        type: String,
        default: "Asia/Kolkata",
      },
    },

    preferences: {
      sessionMode: {
        type: [String],
        enum: ["online", "offline", "hybrid"],
        default: ["online"],
      },
      maxDistance: {
        type: Number,
        default: 10, // km for offline sessions
      },
    },

    // ===== PROFILE STATS =====
    profileViews: {
      type: Number,
      default: 0,
    },

    profileCompleteness: {
      type: Number,
      default: 0, // percentage 0-100
    },

    // ===== ACCOUNT STATUS =====
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deactivated", "banned"],
      default: "active",
    },

    suspensionReason: {
      type: String,
    },

    // ===== ROLE & VERIFICATION =====
    role: {
      type: String,
      enum: ["user", "expert", "admin"],
      default: "user",
    },

    // Expert-specific fields
    expertProfile: {
      isExpert: {
        type: Boolean,
        default: false,
      },
      verifiedAt: {
        type: Date,
      },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Admin who verified
      },
      expertiseAreas: [String], // Main areas of expertise
      yearsOfExperience: {
        type: Number,
        min: 0,
      },
      hourlyRate: {
        type: Number, // Credits per hour
        default: 20,
      },
      certificationDocuments: [
        {
          name: String,
          url: String,
          uploadedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },

    lastActive: {
      type: Date,
      default: Date.now,
    },

    // ===== SOCIAL LINKS =====
    socialLinks: {
      linkedin: String,
      github: String,
      portfolio: String,
      twitter: String,
      instagram: String,
    },

    // ===== NOTIFICATION PREFERENCES =====
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      newMessages: { type: Boolean, default: true },
      sessionReminders: { type: Boolean, default: true },
      reviewReceived: { type: Boolean, default: true },
      creditsEarned: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Index for faster geolocation queries
userSchema.index({
  "location.coordinates.lat": 1,
  "location.coordinates.lng": 1,
});

// Index for search
userSchema.index({ name: "text", bio: "text" });

// Index for role-based queries
userSchema.index({ role: 1, "expertProfile.isExpert": 1 });

// Virtual for full profile URL
userSchema.virtual("profileUrl").get(function () {
  return `/profile/${this._id}`;
});

const User = mongoose.model("User", userSchema);
export default User;
