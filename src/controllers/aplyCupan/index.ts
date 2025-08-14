import { apiResponse } from "../../common";
import { cupanCodeModel } from "../../database/models/cupanCode";
import { reqInfo, responseMessage } from "../../helper"



const ObjectId = require('mongoose').Types.ObjeactId


export const addCupan = async(req,res)=>{
    reqInfo(req)
    try{
        console.log("req.body",req.body);
        

        let response = await cupanCodeModel.create(req.body);
        console.log("response",response);
        
        return res.status(200).json(new apiResponse(200,responseMessage?.getDataSuccess("Cupan"),response,{})); 

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},{}));
        
    }
}