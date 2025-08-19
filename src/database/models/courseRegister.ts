var mongoose = require('mongoose')

const courseRegisterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String },
  mobileNumber: { type: String, required: true },
  city: { type: String },
  paymentMethod: { type: String, enum: ["UPI", "Card", "NetBanking", "Cash"], required: true },
  transactionId: { type: String, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
   
  courseId: { type: mongoose.Schema.Types.ObjectId,ref:'course' },
//   coursePrice: { type: String, required: true },
  paidDateTime: { type: Date, default: Date.now },
  cupanCode: { type: mongoose.Schema.Types.ObjectId, ref: 'cupan-code' },
  profession: { type: String },
  priority: { type: Number, default: 1 },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false });


export const courseRegisterModel = mongoose.model('course-register',courseRegisterSchema);