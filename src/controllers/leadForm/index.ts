import { apiResponse } from "../../common";
import { reqInfo, responseMessage } from "../../helper";
import { createData, getFirstMatch } from "../../helper/database_service";


const ObjectId = require('mongoose').Types.ObjectId

export const addBanner = async (req, res) => {
    reqInfo(req)
    try {

        const body = req.body;
        // let isExist = await getFirstMatch(bannnerModel, { priority: body.priority }, {}, { lean: true });
        // if (isExist) return res.status(404).json(new apiResponse(404, responseMessage.dataAlreadyExist('prority'), {}, {}));

        // let response = await createData(bannnerModel, body);
        // return res.status(200).json(new apiResponse(200, responseMessage.getDataSuccess('banner'), response, {}));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500, responseMessage.internalServerError, {}, error));

    }
}