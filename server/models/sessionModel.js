import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    // Participants
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Skill being taught
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    // Scheduling
    scheduledDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String, // "14:30" format
      required: true,
    },
    endTime: {
      type: String,
    },
    duration: {
      type: Number, // in minutes
      required: true,
      default: 60,
    },

    // Payment
    creditsCharged: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },

    // Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "disputed"],
      default: "pending",
    },

    // Location
    locationType: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "online",
    },
    meetingLink: {
      type: String,
    },
    physicalAddress: {
      type: String,
    },

    // Notes
    learnerNotes: {
      type: String,
      maxlength: 500,
    },
    providerNotes: {
      type: String,
      maxlength: 500,
    },

    // Cancellation
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cancellationReason: {
      type: String,
    },
    cancelledAt: {
      type: Date,
    },

    // Completion
    completedAt: {
      type: Date,
    },

    // Review reference
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },

    // Reminder sent
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
sessionSchema.index({ provider: 1, status: 1 });
sessionSchema.index({ learner: 1, status: 1 });
sessionSchema.index({ scheduledDate: 1 });

const Session = mongoose.model("Session", sessionSchema);
export default Session;
