import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "technology",
        "design",
        "business",
        "languages",
        "arts",
        "music",
        "fitness",
        "cooking",
        "crafts",
        "teaching",
        "other",
      ],
    },

    description: {
      type: String,
      maxlength: 500,
    },

    icon: {
      type: String, // URL or emoji
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
      default: "beginner",
    },

    // User who has this skill
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Endorsements from other users
    endorsements: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    endorsementCount: {
      type: Number,
      default: 0,
    },

    // Experience and proof
    yearsOfExperience: {
      type: Number,
      min: 0,
    },

    certifications: [
      {
        name: String,
        issuedBy: String,
        issuedDate: Date,
        certificateUrl: String,
      },
    ],

    // Verification status
    isVerified: {
      type: Boolean,
      default: false,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or moderator who verified
    },

    verifiedAt: {
      type: Date,
    },

    // Pricing for this skill
    pricing: {
      creditsPerHour: {
        type: Number,
        default: 10,
      },
      sessionDuration: {
        type: Number,
        default: 60, // minutes
      },
    },

    // Tags for better search
    tags: [String],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
skillSchema.index({ name: "text", description: "text", tags: "text" });
skillSchema.index({ category: 1, level: 1 });

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
