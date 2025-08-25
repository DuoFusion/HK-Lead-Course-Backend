import { config } from "../../../config";
import { apiResponse } from "../../common";
import { userModel } from "../../database";
import { workshopRegisterModel } from "../../database/models/workshopRegister";
import { reqInfo, responseMessage } from "../../helper";
import { countData, createData, deleteData, findAllWithPopulate, getData, updateData } from "../../helper/database_service";

import Razorpay from 'razorpay';


let ObjectId = require('mongoose').Types.ObjectId;

export const addWorkShopRegister = async (req, res) => {
    reqInfo(req);
    try {
        const body = req.body;

        let isExist = await workshopRegisterModel.findOne({ email: body.email, isDeleted: false });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage?.dataAlreadyExist("email"), {}, {}))

        const response = await createData(workshopRegisterModel, body);
        return res.status(200).json(new apiResponse(200, responseMessage.addDataSuccess('Workshop Register'), response, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}

export const createRazorpayworkshopRegister = async(payload)=>{
    const {amount, currency = 'INR' , receipt} = payload;

    try{
        const options = {
            amount: amount,
            currency,
            receipt,
        };
    
        // let  user = await userModel.findOne({email:payload.email,isDeleted:false}).select('razorpayKeyId razorpayKeySecret').lean()
        const razorpay = new Razorpay({
            key_id: config.RAZORPAY_KEY_ID as string,
            key_secret: config.RAZORPAY_KEY_SECRET as string,
        })
        
        const order = await razorpay.orders.create(options);
        return order;
     

    }catch(error){
        console.log(error);
        return null;    
    }
}


export const verifyRazorpayPayment = async (req,res)=>{
    reqInfo(req)
    
    let { razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body,{user}= req.headers;
    try{
        const sign = razorpay_order_id+"|"+razorpay_payment_id;

        // const 


    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
  

}


export const updateworkshopRegister = async (req, res) => {
    reqInfo(req)
    try {

        const body = req.body;

        // let isExist = await workshopRegisterModel.findOne({priority:body.priority,isDeleted:false,_id:{$ne:new ObjectId(body.workshopRegisterId)}})
        // if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist("priority"),{},{}))

        const response = await updateData(workshopRegisterModel, { _id: new ObjectId(body.workshopRegisterId) }, body, {});
        if (!response) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('Workshop Register'), {}, {}));
        console.log("response", response);

        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('Workshop Register'), response, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))

    }
}

export const getworkshopRegister = async (req, res) => {
    reqInfo(req)
    let { page, limit, search, blockFilter } = req.query, criteria: any = { isDeleted: false };
    let options: any = { lean: true };
    try {
        if (search) {
            criteria.name = { $regex: search, $options: 'si' };
        }

        if (blockFilter) criteria.isBlocked = blockFilter;


        options.sort = { priority: 1, createdAt: -1 };
        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);

        }

        let populate =[{
            path :'workshopId',select:'title shortDescription date time duration instructorImage instructorName thumbnailImage workshopImage price categoryId status fullDescription syllabus faq isBlocked isDeleted',
        },
       {
    path: 'couponCodeId',
    select: 'name code description discount discountType expiresAt startDate endDate numberOfUses usedCount isActive isDeleted isBlocked'
  }]

        const response = await findAllWithPopulate(workshopRegisterModel, criteria, {}, options,populate);
        const totalCount = await countData(workshopRegisterModel, criteria)

        const stateObj = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || totalCount,
            page_limit: Math.ceil(totalCount / (parseInt(limit) || totalCount)) || 1,

        };

        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('Workshop Register'), { workshopRegister_data: response, totalData: totalCount, state: stateObj }, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}


export const deleteworkshopRegister = async (req, res) => {
    reqInfo(req)
    let { id } = req.params;
    try {
        const response = await deleteData(workshopRegisterModel, { _id: id });
        if (!response) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('Workshop Register'), {}, {}));
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('Workshop Register'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}