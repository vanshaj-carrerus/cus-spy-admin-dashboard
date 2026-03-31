import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema({
    machine_id: { type: String, required: true },
    title: { type: String, required: true },
    app_name: { type: String, required: true },
    start_time: { type: Date, required: true },
    duration_seconds: { type: Number, required: true },
    site: { type: String }, // For extracted website name
}, { timestamps: true });

const ActivityLog = mongoose.models.ActivityLog || mongoose.model("ActivityLog", ActivityLogSchema);
export default ActivityLog;
