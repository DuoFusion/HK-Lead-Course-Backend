var mongoose = require('mongoose');

const couponCodeSchema = new mongoose.Schema({

    name: { type: String },
    code: { type: String },
    description: { type: String },
    discount: { type: Number },
    discountType: { type: String, enum: ["price", "percentage"] },
    startDate: { type: Date },
    endDate: { type: Date },
    numberOfUses: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },
    userUsageLimit: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false }

}, { timestamps: true, versionKey: false });


export const couponCodeModel = mongoose.model('couponCode', couponCodeSchema);
