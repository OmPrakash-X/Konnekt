import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 300,
    },

    icon: {
      type: String,
      required: true, // URL to badge image or emoji
    },

    category: {
      type: String,
      enum: [
        "achievement",
        "skill_mastery",
        "community",
        "reputation",
        "special",
        "milestone",
      ],
      default: "achievement",
    },

    // Criteria to earn this badge
    criteria: {
      minRating: {
        type: Number,
        min: 0,
        max: 5,
      },
      minSessions: {
        type: Number,
        min: 0,
      },
      minEndorsements: {
        type: Number,
        min: 0,
      },
      minReviews: {
        type: Number,
        min: 0,
      },
      specificSkills: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],
      customCondition: String, // For special badges
    },

    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },

    color: {
      type: String,
      default: "#32b8c6", // Konnekt theme color
    },

    // Rewards for earning this badge
    rewards: {
      credits: {
        type: Number,
        default: 0,
      },
      profileBoost: {
        type: Boolean,
        default: false, // Shows in search results first
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Stats
    totalAwarded: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Badge = mongoose.model("Badge", badgeSchema);
export default Badge;
