var mongoose = require('mongoose');

const cupanCodeSchema = new mongoose.Schema({
    code:{type:String},
    description:{type:String},
    discountType:{type:String,enum:['percentage','fixed'],required:true},
    discountValue:{type:Number,required:true},
    maxDiscountAmount:{type:Number},
    usageLimit:{type:Number,default:1},
    usageCount:{type:Number,default:0},
    userUsageLimit:{type:Number,default:1},
    validFrom:{type:Date},
    validTo:{type:Date},
    // isActive:{type:Boolean,default:true},
     isDeleted:{type:Boolean,default:false},
    isBlocked:{type:Boolean,default:false}
},{timestamps:true,versionKey:false});


export const cupanCodeModel = mongoose.model('cupan-code',cupanCodeSchema);
