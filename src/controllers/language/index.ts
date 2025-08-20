import { apiResponse } from "../../common";
import { languageModel } from "../../database/models/language";
import { reqInfo, responseMessage } from "../../helper"
import { createData, getFirstMatch, updateData } from "../../helper/database_service";



const ObjectId = require('mongoose').Types.ObjectId


export const addLanguage = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        let isExist = await getFirstMatch(languageModel,{priority:body.priority},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage.dataAlreadyExist('prority'),{},{}));

        const response = await createData(languageModel,body);
        return res.status(200).json(new apiResponse(200,responseMessage.addDataSuccess('Language'),response,{}))

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}


export const editLanguage = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        let isExist = await getFirstMatch(languageModel,{priority:body.priority,_id:{$ne:new ObjectId(body.LanguageId)}},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage.dataAlreadyExist('prority'),{},{}));

        const response = await updateData(languageModel,{_id:new ObjectId(body.languageId)},body,{});
        return res.status(200).json(new apiResponse(200,responseMessage.updateDataSuccess('Language'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}