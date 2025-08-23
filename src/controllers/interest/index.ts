import { apiResponse } from "../../common";
import { interestModel } from "../../database/models/interest";
import { reqInfo, responseMessage } from "../../helper";
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addInterest = async (req, res) => {
    reqInfo(req)
    try {

        const body = req.body;
        let isExist = await getFirstMatch(interestModel, { priority: body.priority }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        let response = await createData(interestModel, body);
        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('interest'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}

export const editInterest = async (req, res) => {
    reqInfo(req)
    try {
        const body = req.body;

        let isExist = await getFirstMatch(interestModel, { _id: new ObjectId(body.interestId) }, {}, { lean: true });
        if (!isExist) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('interest'), {}, {}));

        isExist = await getFirstMatch(interestModel, { priority: body.priority, _id: { $ne: new ObjectId(body.interestId) } }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        const response = await updateData(interestModel, { _id: new ObjectId(body.interestId) }, body, {});
        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('interest'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}

export const getInterest = async (req, res) => {
    reqInfo(req)
    try {

        let { search, page, limit } = req.query, options: any = { lean: true }, criteria: any = { isDeleted: false };
        if (search) {
            criteria.name = { $regex: search, $options: 'si' };
        }



        options.sort = { priority: 1, createdAt: -1 };


        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);
        }

        const response = await getData(interestModel, criteria, {}, options);
        const totalCount = await countData(interestModel, criteria);

        const stateObj = {
            page: page,
            limit: limit,
            page_limit: Math.ceil(totalCount / limit) || 1,
        }

        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('banner'), { interest_data: response, totalData: totalCount, state: stateObj }, {}));


    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))

    }
}

export const deleteInterest = async (req, res) => {
    reqInfo(req)
    try {
        const { id } = req.params;

        const response = await updateData(interestModel, { _id: id }, { isDeleted: true }, {});
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('interest'), response, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}

