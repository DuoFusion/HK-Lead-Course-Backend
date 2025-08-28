import { WORKSHOP_STATUS } from "../../common";


var mongoose = require('mongoose');
const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String}
}, { _id: false }); // _id: false = pratyek faq mate id generate nahi thase

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: String, required: true },
  instructorImage: { type: String },
  instructorName: { type: String, required: true },
  thumbnailImage: { type: String, required: true },
  workshopImage: { type: String, required: true },
  price: { type: Number },

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },

  status: { type: String, enum:Object.values(WORKSHOP_STATUS)},
  fullDescription: { type: String },
  syllabus: { type: String },
  faq: [faqSchema],   // 🔥 faq array of objects
  priority: { type: Number, default: 0 },
  features: { type: Boolean, default: false },
  // isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export const workshopModel = mongoose.model('workshop', workshopSchema);

