import { apiResponse } from "../../common";
import { categoryModel } from "../../database/models/category";
import { reqInfo, responseMessage } from "../../helper"



export const createCategory = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        let isExist = await categoryModel.findOne({priority:body.priority,isDeleted:false})
        // if(isExist) return res.status(404).json(new api)

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}