const mongoose = require('mongoose');

const couponUsageSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    couponCode: { type: String},
    usedAt: { type: Date, default: Date.now }
},{timestamps:true,versionKey:false});

export const couponUsageModel = mongoose.model('coupon-usage', couponUsageSchema);