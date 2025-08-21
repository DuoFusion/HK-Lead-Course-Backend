import { COURSE_DISCOUNT } from "../../common";

var mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  role: { type: String },
  message: { type: String },
  rating: { type: Number }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  background: { type: String, required: true },
  shortDescription: { type: String, required: true },
  duration: { type: String, required: true },
  skillLevel: { type: String, required: true },
  price: { type: String, required: true },
  totalLectures: { type: String, required: true },
  totalHours: { type: String, required: true },
  rating: { type: Number, required: true },
  whatYouLearn: { type: String },
  instructorName: { type: String },
  instructorImage: { type: String },
  courseImage: { type: String },
  courseLanguage:{type:mongoose.Schema.Types.ObjectId,ref:'language'},
  // courseLanguage: { type: String, enum: ['English', 'Hindi', 'Gujarati'] },
  mrp: { type: String },
  discount: { type: String, enum: Object.values(COURSE_DISCOUNT), default: COURSE_DISCOUNT.PERCENTAGE },
  listOfLecture: [
    {
      title: { type: String },
      description: { type: String },
      _id: false
    }
  ],
  testimonials: [testimonialSchema],
  faq: [faqSchema],
  priority: { type: Number, default: 1 },
  // isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export const courseModel = mongoose.model('course', courseSchema)