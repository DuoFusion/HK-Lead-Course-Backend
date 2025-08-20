import { apiResponse } from "../../common";
import { reqInfo, responseMessage } from "../../helper"
import { getFirstMatch } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addMentors = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        // let isExist = await getFirstMatch()

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}