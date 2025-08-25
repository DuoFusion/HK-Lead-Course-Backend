import mongoose from "mongoose";
import { apiResponse } from "../../common";
import { couponCodeModel } from "../../database/models/couponCode";
import { reqInfo, responseMessage } from "../../helper"
import { countData, getData } from "../../helper/database_service";



const ObjectId = require('mongoose').Types.ObjectId


export const addCoupon = async (req, res) => {
    reqInfo(req)
    try {
        console.log("req.body", req.body);

        const body = req.body

        let isExist =  await couponCodeModel.findOne({ code: body.code, isDeleted: false });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage?.dataAlreadyExist("code"), {}, {}));

        let response = await couponCodeModel.create(req.body);
      

        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("Coupon"), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, {}));

    }
}

export const getCoupon = async (req, res) => {
    reqInfo(req)
    let { page, limit, search } = req.query, criteria: any = { isDeleted: false };
    let options: any = { lean: true };

    try {
        if (search) {
            criteria.name = { $regex: search, $options: 'si' };
        }
        options.sort = { createdAt: -1 };

        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);
        }
        const response = await getData(couponCodeModel, criteria, {}, options);
        const totalCount = await countData(couponCodeModel, criteria);

        const stateObj = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || totalCount,
            page_limit: Math.ceil(totalCount / (parseInt(limit) || totalCount)) || 1,

        }
        // let responce = await couponCodeModel.find({isDeleted: false});
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("Coupon"), { coupon_data: response, totalData: totalCount, state: stateObj }, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, {}))

    }
}

// export const updateCoupon = async(req,res)=>{
//     reqInfo(req)
//     try{
//         let responce = await couponCodeModel.findOneAndUpdate({_id: new ObjectId(req.body._id)},{$set:req.body},{new:true,lean:true});
//         return res.status(200).json(new apiResponse(200,responseMessage?.updateDataSuccess("coupon"),responce,{}));

//     }catch(error){
//         console.log(error);
//         return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},{}))

//     }
// }

export const updateCoupon = async (req, res) => {
    reqInfo(req);

    try {
        const body = req.body;
        const { _id, ...updateFields} = req.body;

        if (!body.couponId) {
            return res.status(400).json( new apiResponse(400, "coupon ID is required", {}, {}) );
        }

        const response = await couponCodeModel.findOneAndUpdate({ _id: new ObjectId(body.couponId) }, { $set: updateFields }, { new: true, lean: true } );

        if (!response) {
            return res.status(404).json( new apiResponse(404, responseMessage.getDataNotFound("coupon"), {}, {}));
        }

        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess("coupon"), response, {}));

    } catch (error: any) {
        console.error(error);
        return res.status(500).json(
            new apiResponse(500, responseMessage.internalServerError, {}, error)
        );
    }
};

export const deleteCoupon = async (req, res) => {
    reqInfo(req)
    try {

        let response = await couponCodeModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(req.params.id) }, { $set: { isDeleted: true } }, { new: true, lean: true });
        if (!response) return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound("coupon"), {}, {}));

        return res.status(200).json(new apiResponse(200, responseMessage?.deleteDataSuccess("Coupon"), response, {}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, {}))

    }
}