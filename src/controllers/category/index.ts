import { error } from "node:console";
import { apiResponse } from "../../common";
import { categoryModel } from "../../database/models/category";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, deleteData, getData, getFirstMatch, updateData } from "../../helper/database_service";

const ObjeactId = require('mongoose').Types.ObjeactId;

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
    let { id } = req.body,
    body = req.body;
    try{
        let isExist = await categoryModel.findOne({priority:body.priority,isDeleted:false})
        if(isExist) return res.status(404).json(new apiResponse(404,responseMessage?.dataAlreadyExist("priority"),{},{}))

        // if(body.parent){
        //     const parent = await getFirstMatch(categoryModel,{_id:body.parent},{},{});
        //     if(parent)body.level = parent.level+1;
        // }

        const response = await updateData(categoryModel,{categoryId:id},body,{});
        if(!response)return res.status(404).json(new apiResponse(404,responseMessage.getDataNotFound('Category'),{},{}));
        return res.status(200).json(new apiResponse(500,responseMessage.updateDataSuccess('Category'),response,{}));

    }catch(error){
        console.log(error);
        return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
        
    }
}

// export const updateLatestNews = async (req, res) => {
//     reqInfo(req)
//     let body = req.body
//     try {
//         let isExist = await latestNewsModel.findOne({ type: body.type, priority: body.priority, isDeleted: false, _id: { $ne: new ObjectId(body.id) } });
//         if (isExist) return res.status(400).json(new apiResponse(400, responseMessage.dataAlreadyExist('priority'), {}, {}));
//         const latestNews = await latestNewsModel.findOneAndUpdate({ _id: new ObjectId(body.id) }, body, { new: true })
//         if (!latestNews) return res.status(404).json(new apiResponse(404, responseMessage.updateDataError('latestNews'), {}, {}));
//         return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('latestNews'), latestNews, {}));
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(new apiResponse(400, responseMessage.internalServerError, {}, error));
//     }
// };

export const deleteCategory = async (req, res) => {
    reqInfo(req)
    let  {id } = req.params;
    
    try {
        const response = await deleteData(categoryModel, { _id:id });
        console.log("response", response);
        // console.log("id",{_id:new ObjeactId(id)});
        
        if (!response) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('Category'), {}, {}));
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('Category'), response, {}));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}

export const getCategories = async (req, res) => {
    reqInfo(req);

    let { page, limit, search } = req.query;
    let criteria : any= { isDeleted: false };
    let options:any = { lean: true, sort: { createdAt: -1 } }; // default sort

    try {
        // Search filter
        if (search) {
            criteria.name = { $regex: search, $options: 'i' };
        }

        // Pagination
        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);
        }

        // Fetch data
        const response = await getData(categoryModel, criteria, {}, options);
        const totalCount = await countData(categoryModel, criteria);

        const stateObj = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || totalCount,
            page_limit: Math.ceil(totalCount / (parseInt(limit) || totalCount)) || 1,
        };

        return res.status(200).json(
            new apiResponse(
                200,
                responseMessage.getDataSuccess('Categories'),
                { category_data: response, totalData: totalCount, state: stateObj },
                {}
            )
        );

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            new apiResponse(500, responseMessage.internalServerError, {}, error)
        );
    }
};

// export const getCategories = async(req,res)=>{
//     reqInfo(req)
//     let {page,limit,search} = req.query,criteria:any={isDeleted:false};
//     let options:any={lean:true};
//     console.log("==",res);
//     console.log("==",search);
    
    
    

//     try{
//         if(search) {
//             criteria.name = {$regex:search,$options:'i'};

//             options.sort = { createdAt: -1 };

//             if (page && limit) {
//                 options.skip = (parseInt(page) - 1) * parseInt(limit);
//                 options.limit = parseInt(limit);
//             }
//             const response = await getData(categoryModel,criteria,{},options);
//             console.log("response", response);
            
//             const totalCount = await countData(categoryModel,criteria);
//             const stateObj = {
//                 page: parseInt(page) || 1,
//                 limit: parseInt(limit) || totalCount,
//                 page_limit: Math.ceil(totalCount / (parseInt(limit) || totalCount)) || 1,
//             };
//             return res.status(200).json(new apiResponse(200,responseMessage.getDataSuccess('Categories'),response,{}));
//         }

//     }catch(error){
//         console.log(error);
//         return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error))
        
//     }
//     // try{
//     //     if(search)criteria.name = {$regex:search,$options:'i'};
//     //     if(page&&limit)options.skip = (parseInt(page)-1)*parseInt(limit),options.limit = parseInt(limit);
//     //     const response = await getData(categoryModel,criteria,{},options);
//     //     const totalCount = await countData(categoryModel,criteria);
//     //     const stateObj = {page:parseInt(page)||1,limit:parseInt(limit)||totalCount,page_limit:Math.ceil(totalCount/(parseInt(limit)||totalCount))||1};
//     //     return res.status(200).json(new apiResponse(200,responseMessage.getDataSuccess('Categories'),{category_data:response,totalData:totalCount,state:stateObj},{}));
//     // }catch(error){
//     //     console.log(error);
//     //     return res.status(500).json(new apiResponse(500,responseMessage.internalServerError,{},error));
//     // }
// }