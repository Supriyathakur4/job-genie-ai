import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: "Applied" },
  appliedDate: { type: Date, default: Date.now },
});

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
