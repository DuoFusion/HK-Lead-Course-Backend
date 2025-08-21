var mongoose = require("mongoose");

const skillLevelSchema = new mongoose.Schema({
  title: { type: String },
  priority: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
  isDeleted:{type:Boolean,default:false}
}, { timestamps: true,versionKey: false });

export const skillLevelModel = mongoose.model("skillLevel", skillLevelSchema);
