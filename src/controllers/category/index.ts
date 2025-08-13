import { error } from "node:console";
import { apiResponse } from "../../common";
import { categoryModel } from "../../database/models/category";
import { reqInfo, responseMessage } from "../../helper"
import { createData, deleteData, getFirstMatch, updateData } from "../../helper/database_service";



export const createCategory = async(req,res)=>{
    reqInfo(req)
    try{
        const body = req.body;
        let isExist = await categoryModel.findOne({priority:body.priority,isDeleted:false})
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist("priority"),{},{}))
            if(body.parent){
                const parent = await getFirstMatch(categoryModel,{_id:body.parent},{},{});
                if(parent)body.level = parent.level+1;

            }
            const response = await createData(categoryModel,body);
            return res.status(200).json(new apiResponse(200,responseMessage.addDataSuccess('Category'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}

export const editCategory = async(req,res)=>{
    reqInfo(req)
    let { id } = req.body,body = req.body;
    try{
        const response = await updateData(categoryModel,{categoryId:id},body,{});
        if(!response)return res.status(404).json(new apiResponse(404,responseMessage.getDataNotFound('Category'),{},{}));
        return res.status(200).json(new apiResponse(500,responseMessage.updateDataSuccess('Category'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

export const deleteCategory = async(req,res)=>{
    reqInfo(req)
    let {id} = req.params;
    try{

        const response = await deleteData(categoryModel,{categoryId:id});
    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error))
        
    }
}