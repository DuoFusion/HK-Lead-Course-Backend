import { apiResponse } from "../../common";
import { aboutModel } from "../../database/models/about";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addAbout = async(req,res)=>{
    reqInfo(req)
    try{
         const body = req.body;
                let isExist = await getFirstMatch(aboutModel, { priority: body.priority }, {}, { lean: true });
                if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));
        
                let response = await createData(aboutModel, body);
                return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('about'), response, {}));
        

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }

}


export const editAbout = async (req, res) => {
    reqInfo(req)
    try {
        const body = req.body;

        let isExist = await getFirstMatch(aboutModel, { _id: new ObjectId(body.aboutId) }, {}, { lean: true });
        if (!isExist) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('about'), {}, {}));

        isExist = await getFirstMatch(aboutModel, { priority: body.priority, _id: { $ne: new ObjectId(body.aboutId) } }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        const response = await updateData(aboutModel, { _id: new ObjectId(body.aboutId) }, body, {});
        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('about'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}

export const getAbout = async(req,res)=>{
    reqInfo(req)
   try{
     let { search, page, limit } = req.query, options: any = { lean: true }, criteria: any = { isDeleted: false };
           if (search) {
               criteria.aboutUs = { $regex: search, $options: 'si' };
           }
           options.sort = { priority: 1, createdAt: -1 };
   
   
           if (page && limit) {
               options.skip = (parseInt(page) - 1) * parseInt(limit);
               options.limit = parseInt(limit);
           }
   
           const response = await getData(aboutModel, criteria, {}, options);
           const totalCount = await countData(aboutModel, criteria);
   
           const stateObj = {
               page: page,
               limit: limit,
               page_limit: Math.ceil(totalCount / limit) || 1,
           }
   
           return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('about'), {about_data: response, totalData: totalCount, state: stateObj }, {}));
   
   

   }catch(error){
       console.log(error);
       return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error)); 
   }
}


export const deleteAbout = async (req, res) => {
    reqInfo(req)
    try {
        const { id } = req.params;

        const response = await updateData(aboutModel, { _id: id }, { isDeleted: true }, {});
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('about'), response, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}