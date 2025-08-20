import { apiResponse } from "../../common";
import { courseRegisterModel } from "../../database/models/courseRegister";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";


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

export const getCourseRegister = async(req,res)=>{
    reqInfo(req)
    try{

        let {search,page,limit,blockFilter} = req.query,options:any={lean:true},criteria:any={isDeleted:false};
        if(search){
            criteria.title = {$regex:search,$options:'si'};
        }

        if(blockFilter)criteria.isBlocked = blockFilter;

        options.sort = { priority: 1, createdAt: -1 };

        const pageNum = parseInt(page)||1;
        const limitNum = parseInt(limit)||0;

        if(page && limit){
            options.skip = (parseInt(page)-1)*parseInt(limit);
            options.limit = parseInt(limit);
        }

        const response = await getData(courseRegisterModel,criteria,{},options);
        const totalCount = await countData(courseRegisterModel,criteria);

        const stateObj = {
            page : pageNum,
            limit: limitNum,
            page_limit: Math.ceil(totalCount/limitNum)||1,
        }

        return res.status(200).json(new apiResponse(200,responseMessage.getDataSuccess('Course Register'),{courseRegister_data:response,totalData:totalCount,state:stateObj},{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

export const deleteCourseRegister = async(req,res)=>{
    reqInfo(req)
    try{
        const  { id } = req.params;

        const response = await updateData(courseRegisterModel,{_id:id},{isDeleted:true},{});
        return res.status(200).json(new apiResponse(200,responseMessage.deleteDataSuccess('Course Register'),response,{}));

    }catch(error){
        console.log(error);

        
    }
}