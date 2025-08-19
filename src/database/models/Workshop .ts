import { duration } from "moment-timezone";

var mongoose = require('mongoose');
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
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
  price: { type: String },
  category: { type: String },
  status: { type: String },
  fullDescription: { type: String },
  syllabus: { type: String },
  faq: [faqSchema],   // 🔥 faq array of objects
    priority: { type: Number, default: 0 },
  features: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

// const workshopSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     shortDescription: { type: String, required: true },
//     date: { type: String, required: true },
//     time: { type: String, required: true },
//     duration: { type: String, required: true },
//     instructorImage: { type: String},
//     instructorName: { type: String, required: true },
//     thumbnailImage: { type: String, required: true },
//     price :{ type: String},
//     category :{ type: String},
//     status:{ type: String},
//     fullDescription: { type: String},
//     syllabus: { type: String},
//     faq: { type: String},
//     features :{ type:Boolean,default:false},
//     isActive: { type: Boolean, default: true },
//     isBlock: { type: Boolean, default: false },
//     isDeleted: { type: Boolean, default: false },
// }, { timestamps: true })

export const workshopModel = mongoose.model('workshop', workshopSchema);

