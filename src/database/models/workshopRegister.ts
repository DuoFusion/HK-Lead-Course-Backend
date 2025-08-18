var mongoose = require('mongoose');

const workshopRegisterSchema = new mongoose.Schema({
    workshopId: { type: mongoose.Schema.Types.ObjectId, ref: 'workshop' },
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    city: { type: String },
    profession: { type: String },
    //  discountType:{type:String,enum:['percentage','fixed'],required:true},
     priority: { type: Number, default: 1 },
  
    paymentStatus: {type:String, enum: ['paid', 'unpaid'], required: true },
    fees: { type: Number, required: true },
    cupanCode: { type: mongoose.Schema.Types.ObjectId, ref: 'cupan-code' },
    paymentMethod: { type: String, required: true },
    TransactionID: { type: String, required: true },

    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    isActive: { type: Boolean, default: true },
    isBlock: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true })

export const workshopRegisterModel = mongoose.model('workshop-register',workshopRegisterSchema);

