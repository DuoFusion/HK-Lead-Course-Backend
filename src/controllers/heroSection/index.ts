import { apiResponse } from "../../common";
import { heroSectionModel } from "../../database/models/heroSection";
import { reqInfo, responseMessage } from "../../helper"
import { countData, createData, getData, getFirstMatch, updateData } from "../../helper/database_service";

const ObjectId = require('mongoose').Types.ObjectId

export const addHeroSection = async (req, res) => {
    reqInfo(req)
    try {

        const body = req.body;
        let isExist = await getFirstMatch(heroSectionModel, { priority: body.priority }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        let response = await createData(heroSectionModel, body);
        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('Hero Section'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}

export const editHeroSection = async (req, res) => {
    reqInfo(req)
    try {
        const body = req.body;

        let isExist = await getFirstMatch(heroSectionModel, { _id: new ObjectId(body.heroSectionId) }, {}, { lean: true });
        if (!isExist) return res.status(404).json(new apiResponse(404, responseMessage.getDataNotFound('Hero Section'), {}, {}));

        isExist = await getFirstMatch(heroSectionModel, { priority: body.priority, _id: { $ne: new ObjectId(body.heroSectionId) } }, {}, { lean: true });
        if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        const response = await updateData(heroSectionModel, { _id: new ObjectId(body.heroSectionId) }, body, {});
        return res.status(200).json(new apiResponse(200, responseMessage.updateDataSuccess('Hero Section'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));
    }
}

export const getHeroSection = async (req, res) => {
    reqInfo(req)
    try {

        let { search, page, limit } = req.query, options: any = { lean: true }, criteria: any = { isDeleted: false };
        if (search) {
            criteria.title = { $regex: search, $options: 'si' };
        }

        options.sort = { priority: 1, createdAt: -1 };


        if (page && limit) {
            options.skip = (parseInt(page) - 1) * parseInt(limit);
            options.limit = parseInt(limit);
        }

        const response = await getData(heroSectionModel, criteria, {}, options);
        const totalCount = await countData(heroSectionModel, criteria);

        const stateObj = {
            page: page,
            limit: limit,
            page_limit: Math.ceil(totalCount / limit) || 1,
        }

        return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('Hero Section'), { heroSection_data: response, totalData: totalCount, state: stateObj }, {}));


    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))

    }
}


export const deleteHeroSection = async (req, res) => {
    reqInfo(req)
    try {
        const { id } = req.params;

        const response = await updateData(heroSectionModel, { _id: id }, { isDeleted: true }, {});
        return res.status(200).json(new apiResponse(200, responseMessage.deleteDataSuccess('Hero Section'), response, {}))

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error))
    }
}