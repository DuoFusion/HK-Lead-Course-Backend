import { apiResponse } from "../../common";
import { workshopRegisterModel } from "../../database/models/workshopRegister";
import { reqInfo, responseMessage } from "../../helper";
import { countData, createData, deleteData, getData, updateData } from "../../helper/database_service";


let ObjectId = require('mongoose').Types.ObjectId;

export const addWorkShopRegister = async(req,res)=>{
    reqInfo(req);
    try{
        const body = req.body;

        let isExist = await workshopRegisterModel.findOne({priority:body.priority,isDeleted:false});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist("priority"),{},{}))

            const response = await createData(workshopRegisterModel,body);
            return res.status(200).json(new apiResponse(200,responseMessage.addDataSuccess('Workshop Register'),response,{}))

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

export const updateworkshopRegister = async(req,res)=>{
    reqInfo(req)
    try{

        const body = req.body;

        // let isExist = await workshopRegisterModel.findOne({priority:body.priority,isDeleted:false,_id:{$ne:new ObjectId(body.workshopRegisterId)}})
        // if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist("priority"),{},{}))

        const response = await updateData(workshopRegisterModel,{_id:new ObjectId(body.workshopRegisterId)},body,{}); 
        if(!response) return res.status(404).json(new apiResponse(404,responseMessage.getDataNotFound('Workshop Register'),{},{}));  
        console.log("response",response);
                            
        return res.status(200).json(new apiResponse(200,responseMessage.updateDataSuccess('Workshop Register'),response,{}))

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error))
        
    }
}

export const getworkshopRegister = async (req,res)=>{
    reqInfo(req)
    let {page,limit,search} = req.query,criteria:any={isDeleted:false};
    let options:any = {lean:true};
    try{
        if(search){
            criteria.name = {$regex:search,$options:'si'};
        }
      

        options.sort = {createdAt:-1};

        if(page && limit){
            options.skip = (parseInt(page)-1)*parseInt(limit);
            options.limit = parseInt(limit);

        }
        const response = await getData(workshopRegisterModel,criteria,{},options);
        const totalCount = await countData(workshopRegisterModel,criteria)

        const stateObj = {
            page:parseInt(page)||1,
            limit:parseInt(limit) || totalCount,
            page_limit:Math.ceil(totalCount/(parseInt(limit) || totalCount)) ||1,

        };

        return res.status(200).json(new apiResponse(200,responseMessage.getDataSuccess('Workshop Register'),{category_data:response,totalData:totalCount,state:stateObj},{}));



    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}


export const deleteworkshopRegister = async(req,res)=>{
    reqInfo(req)
    let { id } = req.params;
    try{
        const response = await deleteData(workshopRegisterModel,{_id:id});
        if(!response) return res.status(404).json(new apiResponse(404,responseMessage.getDataNotFound('Workshop Register'),{},{}));
        return res.status(200).json(new apiResponse(200,responseMessage.deleteDataSuccess('Workshop Register'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}