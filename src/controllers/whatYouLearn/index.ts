import { apiResponse } from "../../common";
import { whatYouLearnModel } from "../../database/models/whatYouLearn";
import { reqInfo, responseMessage } from "../../helper";
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";



const ObjectId = require('mongoose').Types.ObjectId


export const addWhatYouLearn = async(req,res)=>{
    try {
        const body = req.body;
        let isExist = await getFirstMatch(whatYouLearnModel,{priority:body.priority},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist('Priority'),{},{}));

        const response = await createData(whatYouLearnModel,body);

        return res.status(200).json(new apiResponse(200,responseMessage?.addDataSuccess('What you Learn'),response,{}));
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error))
        
        
    }
}

export const editWhatYouLearn = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;

        let isExist = await getFirstMatch(whatYouLearnModel,{priority:body.priority,_id:{$ne:new ObjectId(body.whatYouLearnId)}},{},{lean:true});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist('Priority'),{},{}));

        const response = await updateData(whatYouLearnModel,{_id:new ObjectId(body.whatYouLearnId),isDeleted:false},body,{new:true});
        return res.status(200).json(new apiResponse(200,responseMessage?.updateDataSuccess('What You Learn'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
    
}


export const getWhatYouLearn = async(req,res)=>{
    reqInfo(req)
    try{
       let {search , page , limit} =req.query,options:any = {lean:true},criteria:any = {isDeleted:false};
       if(search) {
        criteria.title = { $regex: search, $options: 'si'};
       } 

       options.sort = { priority: 1, createdAt: -1 };

       if(page && limit){
        options.skip = (parseInt(page)-1)*parseInt(limit);
        options.limit = parseInt(limit);
       }

       const responce = await getData(whatYouLearnModel,criteria,{},options);
       const totalCount = await countData(whatYouLearnModel,criteria);

       const stateObj = {
           page : parseInt(page)||1,
           limit: parseInt(limit)||totalCount,
           page_limit: Math.ceil(totalCount/(parseInt(limit)|| totalCount))||1,

       };
       return res.status(200).json(new apiResponse(200,responseMessage?.getDataSuccess('What You Learn'),{what_you_learn_data:responce,totalData:totalCount,state:stateObj},{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error)) 
    }
}

export const deleteWhatYouLearn = async(req,res)=>{
    reqInfo(req)
    try{
        let response = await updateData(whatYouLearnModel, { _id: new ObjectId(req.params.id), isDeleted: false }, { isDeleted: true }, { new: true });
        if (!response) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('What You Learn'), {}, {}));
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('What You Learn'), response, {}));
        
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}