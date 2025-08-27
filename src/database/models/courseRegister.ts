import { COURSE_REGISTER_PAYMENT_METHOD, COURSE_REGISTER_PAYMENT_STATUS } from "../../common";

var mongoose = require('mongoose')

const courseRegisterSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  city: { type: String },
  paymentMethod: { type: String, enum:Object.values(COURSE_REGISTER_PAYMENT_METHOD)},
  transactionId: { type: String, required: true },
  paymentStatus: { type: String, enum:Object.values(COURSE_REGISTER_PAYMENT_STATUS), default: "Pending" },

   fees:{type:Number},
  
   courseId: { type: mongoose.Schema.Types.ObjectId,ref:'course' },
  paidDateTime: { type: Date, default: Date.now },
  couponCodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'couponCode' },
  profession: { type: String },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false });


export const courseRegisterModel = mongoose.model('course-register',courseRegisterSchema);