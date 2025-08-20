var mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const testimonialSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String, required: true }
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
  courseLanguage: { type: String },
  mrp: { type: String },
  discount: { type: String, enum: ['percentage', 'fixed'] },
  listOfLectureTitle: { type: String },
  listOfLectureDescription: { type: String },
   testimonials: [testimonialSchema],
  faq: [faqSchema],
  priority: { type: Number, default: 1 },
  // isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export const courseModel = mongoose.model('course', courseSchema)