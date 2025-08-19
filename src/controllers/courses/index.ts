import { apiResponse } from "../../common";
import { courseModel } from "../../database/models/courses";
import { reqInfo, responseMessage } from "../../helper"
import { createData } from "../../helper/database_service";


export const addCourse= async (req,res) => {
    reqInfo(req)
    try{
        const body = req.body;

        let isExist = await courseModel.findOne({type:body.type,priority:body.priority,isDeleted:false});
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist("priority"),{},{}));
        
        const response = await createData(courseModel,body);

        return res.status(200).json(new apiResponse(200,responseMessage.addDataSuccess('Course'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}