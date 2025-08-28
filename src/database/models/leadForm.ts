import { LEADFORM_PREFERRED_LEARNING_MODE } from "../../common";

var mongoose = require('mongoose')

const leadFormSchema = new mongoose.Schema({

    fullName: { type: String },
    email: { type: String },
    address: { type: String },
    phone: { type: String },
    city: { type: String },

    interestId: { type: mongoose.Schema.Types.ObjectId, ref: 'interest' },
    preferredLearningMode: {
        type: String,
        enum: Object.values(LEADFORM_PREFERRED_LEARNING_MODE),
        default: LEADFORM_PREFERRED_LEARNING_MODE.ONLINE
    },
    background: { type: String },          // e.g., "Engineering", "Commerce"
    itKnowledgeLevel: { type: String },    // e.g., "Beginner", "Intermediate", "Advanced"
    additionalMessage: { type: String },
    // priority: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }
}, { timestamps: true, versionKey: false });


export const leadFormModel = mongoose.model('leadForm', leadFormSchema);