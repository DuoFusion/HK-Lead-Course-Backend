import { title } from "process";

var mongoose = require("mongoose");

const skillLevelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("SkillLevel", skillLevelSchema);
