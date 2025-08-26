import { apiResponse } from "../../common";
import { leadFormModel } from "../../database/models/leadForm";
import { reqInfo, responseMessage } from "../../helper";
import { countData, createData, findAllWithPopulate, getData, getFirstMatch, updateData } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addLeadForm = async (req, res) => {
    reqInfo(req)
    try {

        const body = req.body;
        // let isExist = await getFirstMatch(leadFormModel, {}, {}, { lean: true });
        // if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        let response = await createData(leadFormModel, body);
        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('lead form'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}

export const editLeadForm = async (req, res) => {
    reqInfo(req)
    try {
        const body = req.body;

        let isExist = await getFirstMatch(leadFormModel, { _id: new ObjectId(body.leadFormId) }, {}, { lean: true });
        if (!isExist) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('lead form'), {}, {}));

        isExist = await getFirstMatch(leadFormModel, { priority: body.priority, _id: { $ne: new ObjectId(body.leadFormId) } }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        const response = await updateData(leadFormModel, { _id: new ObjectId(body.leadFormId) }, body, {});
        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('leadFormId'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}

export const getLeadForm = async (req, res) => {
    reqInfo(req)
    try {

        let { search, page, limit } = req.query, options: any = { lean: true }, criteria: any = { isDeleted: false };
        if (search) {
            criteria.fullName = { $regex: search, $options: 'si' };
        }
      

        options.sort = { priority: 1, createdAt: -1 };


        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);
        }

        let populate = [
            { path: 'interestId', select: 'name priority' }
        ]
        const response = await findAllWithPopulate(leadFormModel, criteria, {}, options,populate);
        const totalCount = await countData(leadFormModel, criteria);

        const stateObj = {
            page: page,
            limit: limit,
            page_limit: Math.ceil(totalCount / limit) || 1,
        }

        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('lead form'), { leadForm_data: response, totalData: totalCount, state: stateObj }, {}));


    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))

    }
}

export const deleteLeadForm = async (req, res) => {
    reqInfo(req)
    try {
        const { id } = req.params;

        const response = await updateData(leadFormModel, { _id: id }, { isDeleted: true }, {});
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('lead form'), response, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}