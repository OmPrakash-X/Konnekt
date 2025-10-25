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
      default: 100,
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

    // ===== LOCATION FOR GEO MATCHING (UPDATED FOR MAPBOX + MONGODB GEOSPATIAL) =====
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude] - ORDER MATTERS!
        default: [0, 0],
        validate: {
          validator: function(v) {
            return v.length === 2 && 
                   v[0] >= -180 && v[0] <= 180 && // longitude range
                   v[1] >= -90 && v[1] <= 90;     // latitude range
          },
          message: 'Coordinates must be [longitude, latitude] with valid ranges'
        }
      },
      address: {
        type: String,
        trim: true,
        default: ""
      },
      city: { 
        type: String, 
        trim: true,
        default: ""
      },
      area: { 
        type: String, 
        trim: true,
        default: ""
      },
      state: {
        type: String,
        trim: true,
        default: ""
      },
      country: { 
        type: String, 
        default: "India" 
      },
      postalCode: {
        type: String,
        trim: true
      },
      lastUpdated: {
        type: Date,
        default: Date.now
      }
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
          start: String,
          end: String,
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
      default: 0,
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
        ref: "User",
      },
      expertiseAreas: [String],
      yearsOfExperience: {
        type: Number,
        min: 0,
      },
      hourlyRate: {
        type: Number,
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
    timestamps: true,
  }
);

// ===== UPDATED INDEXES FOR GEOSPATIAL QUERIES =====

// 2dsphere index for MongoDB geospatial queries (REQUIRED for $near queries)
userSchema.index({ 'location': '2dsphere' });

// Compound indexes for better query performance
userSchema.index({ 'location.city': 1, accountStatus: 1 });
userSchema.index({ 'location.coordinates': '2dsphere', accountStatus: 1 });

// Index for search
userSchema.index({ name: "text", bio: "text" });

// Index for role-based queries
userSchema.index({ role: 1, "expertProfile.isExpert": 1 });

// Virtual for full profile URL
userSchema.virtual("profileUrl").get(function () {
  return `/profile/${this._id}`;
});

// Pre-save middleware to update lastUpdated on location change
userSchema.pre('save', function(next) {
  if (this.isModified('location.coordinates')) {
    this.location.lastUpdated = new Date();
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
