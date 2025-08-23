import { apiResponse } from "../../common"
import { profileSettingModel } from "../../database/models/profileSetting"
import { reqInfo, responseMessage } from "../../helper"
import { addEditProfileSettingSchema } from "../../validation/profile-Setting"


const ObjectId = require('mongoose').Types.ObjectId

export const add_edit_Profile_Setting = async(req,res)=>{
     reqInfo(req)
        try {
            const { error, value } = addEditProfileSettingSchema.validate(req.body)
            if (error) return res.status(501).json(new apiResponse(501, error?.details[0]?.message, {}, {}))
    
            const response = await profileSettingModel.findOneAndUpdate({ isDeleted: false }, value, { new: true, upsert: true })
            return res.status(200).json(new apiResponse(200, responseMessage?.updateDataSuccess("Profile Setting"), response, {}))
        } catch (error) {
            console.log(error);
            return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
        }
}


export const get_Profile_Setting = async (req, res) => {
    reqInfo(req)
    let { user } = req.headers
    console.log("user", user);
    try {
        const response = await profileSettingModel.findOne({ isDeleted: false })
        if (!response) return res.status(404).json(new apiResponse(404, responseMessage?.getDataNotFound("profile setting"), {}, {}))
        return res.status(200).json(new apiResponse(200, responseMessage?.getDataSuccess("profile setting"), response, {}))
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}