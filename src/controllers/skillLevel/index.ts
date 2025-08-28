import { log } from "util";
import { apiResponse } from "../../common";
import { skillLevelModel } from "../../database/models/skillLevel";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";

const ObjectId = require('mongoose').Types.ObjectId

export const addSkillLevel = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        let isExist = await getFirstMatch(skillLevelModel,{priority:body.priority},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist('Priority'),{},{}));

        const response = await createData(skillLevelModel,body);

        res.status(200).json(new apiResponse(200,responseMessage?.addDataSuccess('Skill level'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},error))
        
    }
}

export const editSkillLevel = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        
        let isExist = await getFirstMatch(skillLevelModel,{priority:body.priority,_id:{$ne:new ObjectId(body.skillLevelId)}},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist('Priority'),{},{}));
        
        const response = await updateData(skillLevelModel,{_id:new ObjectId(body.skillLevelId),isDeleted:false},body,{new:true});
        
        if(!response) return res.status(404).json(new apiResponse(404,responseMessage?.getDataNotFound('Skill Level'),{},{}))

            return res.status(200).json(new apiResponse(200,responseMessage?.updateDataSuccess('Skill Level'),response,{}))

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},error))
        
    }
}

export const getSkillLevel = async(req,res)=>{
    reqInfo(req)
    try{
        let {search,page,limit} = req.query,options:any = {lean:true},criteria:any={isDeleted:false};
        if(search){
            criteria.title = {$regex:search,$options:'si'}
        }

        options.sort = {priority:1, createdAt: -1};

        if(page && limit){
            options.skip = (parseInt(page)-1)*parseInt(limit);
            options.limit = parseInt(limit);
        }
        
        const responce = await getData(skillLevelModel,criteria,{},options);
        const totalCount = await countData(skillLevelModel,criteria);
        
        const stateObj = {
            page : parseInt(page)||1,
            limit: parseInt(limit)||totalCount,
            page_limit: Math.ceil(totalCount/(parseInt(limit)|| totalCount))||1,
        };

        return res.status(200).json(new apiResponse(200,responseMessage?.getDataNotFound('Skill Level'),{skill_level_data:responce,totalData:totalCount,state:stateObj},{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},error));
        
    }
}

export const deleteSkillLevel =  async(req,res)=>{
    reqInfo(req)
    try{
        let response = await updateData(skillLevelModel,{_id:new ObjectId(req.params.id),isDeleted:false},{isDeleted:true},{new:true});
        if(!response) return res.status(404).json(new apiResponse(404,responseMessage?.getDataNotFound('Skill Level'),{},{}));

        return res.status(200).json(new apiResponse(200,responseMessage?.deleteDataSuccess('Skill Level'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage?.internalServerError,{},error));
        
    }
}