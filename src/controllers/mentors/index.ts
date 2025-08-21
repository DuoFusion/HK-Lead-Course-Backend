import { apiResponse } from "../../common";
import { mentorsModel } from "../../database/models/mentors";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";


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

export const editMentors = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        // console.log("body",body);
        

        let isExist = await getFirstMatch(mentorsModel,{_id:new ObjectId(body.mentorsId)},{},{lean:true});
        if(!isExist) return res.status(404).json(new apiResponse(404,responseMessage?.getDataNotFound('Mentors'),{},{}));

        isExist = await getFirstMatch(mentorsModel,{priority:body.priority,_id:{$ne:new ObjectId(body.mentorsId)}},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist('Priority'),{},{}));

        const response = await mentorsModel.findOneAndUpdate({_id:new ObjectId(body.mentorsId)},body,{new:true});
        return res.status(200).json(new apiResponse(200,responseMessage?.updateDataSuccess('Mentors'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

export const getMentors = async(req,res)=>{
    reqInfo(req)
    try{
        let {search,page,limit,blockFilter} =req.query,options:any={lean:true},criteria:any={isDeleted:false};
        if(search){
            criteria.name = {$regex:search,$options:'si'};
        }

        if(blockFilter) criteria.isBlocked = blockFilter;

        options.sort = {priority:1,createdAt:-1};

        if(page && limit){
            options.skip = (parseInt(page)-1)*parseInt(limit);
            options.limit = parseInt(limit);
        }

        const response = await getData(mentorsModel,criteria,{},options);
        const totalCount = await countData(mentorsModel,criteria);

        const stateObj = {
            page: parseInt(page)||1,
            limit :parseInt(limit)||totalCount,
            page_limit: Math.ceil(totalCount/(parseInt(limit)))||1,
        }
        return res.status(200).json(new apiResponse(200,responseMessage?.getDataSuccess('Mentors'),{mentors_data:response,totalData:totalCount,state:stateObj},{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error))
        
    }
}

export const deleteMentors = async(req,res)=>{
    reqInfo(req)
    try{
        
        // console.log("req.params.id",req.params.id);
        let response = await updateData(mentorsModel,{_id:new ObjectId(req.params.id),isDeleted:false},{isDeleted:true},{new:true});
        // console.log("response",response);
        
        if(!response) return res.status(404).json(new apiResponse(404,responseMessage.getDataNotFound('Mentors'),{},{}));
        return res.status(200).json(new apiResponse(200,responseMessage.deleteDataSuccess('Mentors'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}