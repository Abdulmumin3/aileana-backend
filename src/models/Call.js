import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ["started", "ended"] },
  startedAt: Date,
  endedAt: Date
});

export default mongoose.model("Call", callSchema);
