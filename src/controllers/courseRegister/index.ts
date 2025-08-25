
import { config } from "../../../config";
import { apiResponse } from "../../common";
import { courseRegisterModel } from "../../database/models/courseRegister";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, findAllWithPopulate, getData, getFirstMatch, updateData } from "../../helper/database_service";

import Razorpay from 'razorpay'
import crypto from 'crypto'

const ObjectId = require('mongoose').Types.ObjectId

export const addCourseRegister = async (req, res) => {
    reqInfo(req)
    const body = req.body;
    try {
        let isExist = await getFirstMatch(courseRegisterModel, { email: body.email }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('email'), {}, {}));

        const newRegister = await courseRegisterModel.create(body);

        const razorpay = new Razorpay({
            key_id: config.RAZORPAY_KEY_ID as string,
            key_secret: config.RAZORPAY_KEY_SECRET as string,
        })

        const order = await razorpay.orders.create({
            amount : body.fees * 100, // amount in paise
            currency: "INR",    
            receipt: `receipt_${newRegister._id}`,
        });

        newRegister.razorpayOrderId = order.id;
        await newRegister.save();

        return res.status(200).json(new apiResponse(200, responseMessage.addDataSuccess('Course Register'), {
            user: newRegister,
           order
        }, {}));


        // const response = await createData(courseRegisterModel, body);
        // return res.status(200).json(new apiResponse(200, responseMessage.addDataSuccess('Course Register'), response, {}));
   
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}
export const verifyRazorpayPayment = async (req,res)=>{
    reqInfo(req)
    let {razorpay_order_id,razorpay_payment_id,razorpay_signature,email} = req.body;
    try{
        const sign = razorpay_order_id+"|"+razorpay_payment_id;
        const exceptedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET as string).update(sign.toString()).digest("hex");


        if(exceptedSignature === razorpay_signature){

            await courseRegisterModel.findOneAndUpdate(
                { email: email, razorpayOrderId: razorpay_order_id },
                { paymentStatus: "success", razorpayPaymentId: razorpay_payment_id }
            )
            return res.status(200).json(new apiResponse(200,responseMessage.paymentSuccess,{razorpay_order_id,razorpay_payment_id,razorpay_signature},{}));
        }
          return res.status(400).json(new apiResponse(400, responseMessage.paymentFailed, {
            razorpay_order_id, razorpay_payment_id, razorpay_signature
        }, {}));
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}
export const editcourseRegister = async (req, res) => {
    reqInfo(req)
    try {
        const body = req.body;

        let isExist = await getFirstMatch(courseRegisterModel, { email: body.email , _id: { $ne: new ObjectId(body.courseRegisterId) } }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('email'), {}, {}));

        const response = await updateData(courseRegisterModel, { _id: new ObjectId(body.courseRegisterId) }, body, {});
        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('Course Register'), response, {}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}

export const getCourseRegister = async (req, res) => {
    reqInfo(req)
    try {

        let { search, page, limit, blockFilter } = req.query, options: any = { lean: true }, criteria: any = { isDeleted: false };
        if (search) {
            criteria.title = { $regex: search, $options: 'si' };
        }

        if (blockFilter) criteria.isBlocked = blockFilter;

        options.sort = { priority: 1, createdAt: -1 };

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 0;

        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);
        }

    //     let populate = [{
    //         path: 'courseId', select: 'title subtitle background shortDescription duration skillLevelId price totalLectures totalHours ',
    //     },{
    //         path:'couponCodeId' , select : 'name code description discount discountType expiresAt startDate endDate numberOfUses usedCount isActive isDeleted isBlocked',
    //  } ]
     
let populate = [
  {
    path: 'courseId',
    select: 'title subtitle background shortDescription duration skillLevelId price totalLectures totalHours '
  },
  {
    path: 'couponCodeId',
    select: 'name code description discount discountType expiresAt startDate endDate numberOfUses usedCount isActive isDeleted isBlocked'
  }
]


     const response = await findAllWithPopulate(courseRegisterModel, criteria, {}, options, populate);
     console.log("=======",populate);
        const totalCount = await countData(courseRegisterModel, criteria);

        const stateObj = {
            page: pageNum,
            limit: limitNum,
            page_limit: Math.ceil(totalCount / limitNum) || 1,
        }

        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('Course Register'), { courseRegister_data: response, totalData: totalCount, state: stateObj }, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}

export const deleteCourseRegister = async (req, res) => {
    reqInfo(req)
    try {
        const { id } = req.params;

        const response = await updateData(courseRegisterModel, { _id: id }, { isDeleted: true }, {});
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('Course Register'), response, {}));


    } catch (error) {
        console.log(error);

        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}