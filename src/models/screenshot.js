import mongoose from "mongoose";

const screenshotSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sessionId: {
            type: String,
        },
        email: {
            type: String,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Screenshot =
    mongoose.models.Screenshot || mongoose.model("Screenshot", screenshotSchema);

export default Screenshot;
