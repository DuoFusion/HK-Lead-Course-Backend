import { apiResponse } from "../../common";
import { heroSectionModel } from "../../database/models/heroSection";
import { reqInfo, responseMessage } from "../../helper"
import { createData, getFirstMatch, updateData } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addHeroSection = async(req,res)=>{
    reqInfo(req)
    try{
    
        const body = req.body;
        let isExist = await getFirstMatch(heroSectionModel,{priority:body.priority},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage.dataAlreadyExist('prority'),{},{}));

        let response =await createData(heroSectionModel,body);
       return res.status(200).json(new apiResponse(200,responseMessage.getDataSuccess('Hero Section'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

export const editHeroSection = async(req,res)=>{
    reqInfo(req)
    try{

     
        const body = req.body;

        let isExist = await getFirstMatch(heroSectionModel,{priority:body.priority,_id:{$ne:new ObjectId(body.heroSectionId)}},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage.dataAlreadyExist('prority'),{},{}));
        
        const response = await updateData(heroSectionModel,{_id:new ObjectId(body.heroSectionId)},body,{});
        return res.status(200).json(new apiResponse(200,responseMessage.updateDataSuccess('Hero Section'),response,{}));

    
    
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}