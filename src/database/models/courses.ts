var mongoose = require('mongooe')

const courseSchema = new mongoose.Schema({
    title:{type:String,required:true},
    Subtitle:{type:String,required:true},

    // name: { type: String, required: true },
    // slug: { type: String, required: true, unique: true },
    // description: { type: String },
    // image: { type: String },
    // parent: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true, versionKey: false });

export const courseModel = mongoose.model('course',courseSchema)