import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  appName: string;
  timeSpent: number; // in minutes
  timestamp: Date;
}

const ActivitySchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appName: { type: String, required: true },
  timeSpent: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
