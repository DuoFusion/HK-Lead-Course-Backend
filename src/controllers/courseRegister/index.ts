import { apiResponse } from "../../common";
import { courseRegisterModel } from "../../database/models/courseRegister";
import { reqInfo, responseMessage } from "../../helper"
import { createData, getFirstMatch, updateData } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addCourseRegister = async (req,res)=>{
    reqInfo(req)
    try{
        const body  = req.body;
        let isExist= await getFirstMatch(courseRegisterModel,{priority:body.priority},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage.dataAlreadyExist('prority'),{},{}));

        const response = await createData(courseRegisterModel,body);
        return res.status(200).json(new apiResponse(200,responseMessage.addDataSuccess('Course Register'),response,{}));


    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

export const editcourseRegister = async(req,res)=>{
    reqInfo(req)
    try{

        const body = req.body;

        let isExist = await getFirstMatch(courseRegisterModel,{priority:body.priority,_id:{$ne:new ObjectId(body.courseRegisterId)}},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage.dataAlreadyExist('prority'),{},{}));    

        const response = await updateData(courseRegisterModel,{_id:new ObjectId(body.courseRegisterId)},body,{});
        return res.status(200).json(new apiResponse(200,responseMessage.updateDataSuccess('Course Register'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}