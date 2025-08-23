import { COURSE_DISCOUNT } from "../../common";

var mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String}
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
  skillLevelId: { type: mongoose.Schema.Types.ObjectId, ref: 'skillLevel' },
  price: { type: Number, required: true },
  totalLectures: { type: Number, required: true },
  totalHours: { type: String, required: true },
  rating: { type: Number, required: true },
  whatYouLearnId: { type: mongoose.Schema.Types.ObjectId, ref: 'whatYouLearn' },
  instructorName: { type: String },
  instructorImage: { type: String },
  courseImage: { type: String },
  courseLanguageId:{type:mongoose.Schema.Types.ObjectId,ref:'language'},
  // courseLanguage: { type: String, enum: ['English', 'Hindi', 'Gujarati'] },
  mrp: { type: Number },
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