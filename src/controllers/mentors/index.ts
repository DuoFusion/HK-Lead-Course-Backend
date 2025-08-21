import { apiResponse } from "../../common";
import { mentorsModel } from "../../database/models/mentors";
import { reqInfo, responseMessage } from "../../helper"
import { createData, getFirstMatch } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addMentors = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        let isExist = await getFirstMatch(mentorsModel,{priority:body.priority},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist('Priority'),{},{}));


        const response = await createData(mentorsModel,body);
        return res.status(200).json(new apiResponse(200,responseMessage?.addDataSuccess('Mentors'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}

export const getMentors = async(req,res)=>{
    reqInfo(req)
    try{

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error))
        
    }
}