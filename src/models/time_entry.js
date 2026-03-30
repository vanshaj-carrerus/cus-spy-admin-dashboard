import mongoose from "mongoose";

const TimeEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    trackedTimeSeconds: { type: Number, default: 0 },
}, { timestamps: true });

// Compound index to ensure uniqueness for a given user per day
TimeEntrySchema.index({ userId: 1, date: 1 }, { unique: true });

const TimeEntry = mongoose.models.TimeEntry || mongoose.model("TimeEntry", TimeEntrySchema);
export default TimeEntry;
