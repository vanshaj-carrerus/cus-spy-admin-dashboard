import mongoose, { Schema, Document } from 'mongoose';

export interface IScreenshot extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  timestamp: Date;
}

const ScreenshotSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Screenshot || mongoose.model<IScreenshot>('Screenshot', ScreenshotSchema);
