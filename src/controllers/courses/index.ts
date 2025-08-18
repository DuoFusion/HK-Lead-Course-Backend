import { apiResponse } from "../../common";
import { reqInfo, responseMessage } from "../../helper"


export const addCourse= async (req,res) => {
    reqInfo(req)
    try{
        const body = req.body;

        // let isExist = await 

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}