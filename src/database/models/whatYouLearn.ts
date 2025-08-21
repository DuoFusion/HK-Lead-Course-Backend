var mongoose = require("mongoose");

const whatYouLearnSchema = new mongoose.Schema({
  title: { type: String },
  priority: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
  isDeleted:{type:Boolean,default:false}
}, { timestamps: true,versionKey: false });

export const whatYouLearnModel = mongoose.model("whatYouLearn", whatYouLearnSchema);
