// "use strict"
// import bcryptjs from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { Request, Response } from 'express'
// import { userModel, userSessionModel, adminModel } from '../../database'
// import { apiResponse } from '../../common'
// import { reqInfo, responseMessage, sendEmail } from '../../helper'
// import { config } from '../../../config'

// const ObjectId = require('mongoose').Types.ObjectId
// const jwt_token_secret = config.JWT_TOKEN_SECRET


// export const adminSignup = async (req: Request, res: Response) => {
//   try {
//     const { name, email, phoneNumber, password } = req.body;
//     const exists = await adminModel.findOne({ email });
//     if (exists) return res.status(409).json({ status: false, message: 'Email already exists' });
//     const hash = await bcryptjs.hash(password, 10);
//     const admin = new adminModel({ name, email, phoneNumber, password: hash });
//     await admin.save();
//     return res.status(201).json({ status: true, message: 'Admin signup successful' });
//   } catch (err) {
//     res.status(500).json({ status: false, message: 'Internal server error' });
//   }
// };

// export const adminLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await adminModel.findOne({ email, isActive: true });
//     if (!admin) return res.status(400).json({ status: false, message: 'Invalid email or password' });
//     if (admin.isBlock) return res.status(403).json({ status: false, message: 'Account is blocked' });
//     const passwordMatch = await bcryptjs.compare(password, admin.password);
//     if (!passwordMatch) return res.status(400).json({ status: false, message: 'Invalid email or password' });
//     const token = jwt.sign({ _id: admin._id, email: admin.email, userType: 'admin' }, jwt_token_secret, { expiresIn: '7d' });
//     return res.status(200).json({ status: true, message: 'Admin login successful', data: { token } });
//   } catch (err) {
//     res.status(500).json({ status: false, message: 'Internal server error' });
//   }
// };

// export const userSignup = async (req: Request, res: Response) => {
//   try {
//     const { name, email, phoneNumber, password } = req.body;
//     const exists = await userModel.findOne({ email });
//     if (exists) return res.status(409).json({ status: false, message: 'Email already exists' });
//     const hash = await bcryptjs.hash(password, 10);
//     const user = new userModel({ name, email, phoneNumber, password: hash });
//     await user.save();
//     return res.status(201).json({ status: true, message: 'User signup successful' });
//   } catch (err) {
//     res.status(500).json({ status: false, message: 'Internal server error' });
//   }
// };

// export const userLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userModel.findOne({ email, isActive: true });
//     if (!user) return res.status(400).json({ status: false, message: 'Invalid email or password' });
//     if (user.isBlock) return res.status(403).json({ status: false, message: 'Account is blocked' });
//     const passwordMatch = await bcryptjs.compare(password, user.password);
//     if (!passwordMatch) return res.status(400).json({ status: false, message: 'Invalid email or password' });
//     const token = jwt.sign({ _id: user._id, email: user.email, userType: 'user' }, jwt_token_secret, { expiresIn: '7d' });
//     return res.status(200).json({ status: true, message: 'User login successful', data: { token } });
//   } catch (err) {
//     res.status(500).json({ status: false, message: 'Internal server error' });
//   }
// };

// export const login = async (req: Request, res: Response) => { //email or password // phone or password
//     let body = req.body,
//         response: any
//     reqInfo(req)
//     try {
//         response = await userModel.findOneAndUpdate({ email: body?.email, isActive: true , userType : 0 }, { $addToSet: { deviceToken: body?.deviceToken } , isLoggedIn : true }).select('-__v -createdAt -updatedAt')

//         if (!response) return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
//         if (response?.isBlock == true) return res.status(403).json(new apiResponse(403, responseMessage?.accountBlock, {}, {}))

//         const passwordMatch = await bcryptjs.compare(body.password, response.password)
//         if (!passwordMatch) return res.status(400).json(new apiResponse(400, responseMessage?.invalidUserPasswordEmail, {}, {}))
//         const token = jwt.sign({
//             _id: response._id,
//             type: response.userType,
//             status: "Login",
//             generatedOn: (new Date().getTime())
//         }, jwt_token_secret)

//         await new userSessionModel({
//             createdBy: response._id,
//         }).save()
//         response = {
//             isEmailVerified: response?.isEmailVerified,
//             userType: response?.userType,
//             _id: response?._id,
//             email: response?.email,
//             token,
//         }
//         return res.status(200).json(new apiResponse(200, responseMessage?.loginSuccess, response, {}))

//     } catch (error) {
//         return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
//     }
// }

// export const forgot_password = async (req: Request, res: Response) => {
//     reqInfo(req);
//     let body = req.body, //email or phoneNumber
//         otpFlag = 1, // OTP has already assign or not for cross-verification
//         otp = 0
//     try {
//         body.isActive = true;
//         let data = await userModel.findOne(body);

//         if (!data) {
//             return res.status(400).json(new apiResponse(400, responseMessage?.invalidEmail, {}, {}));
//         }
//         if (data.isBlock == true) {
//             return res.status(403).json(new apiResponse(403, responseMessage?.accountBlock, {}, {}));
//         }

//         while (otpFlag == 1) {
//             for (let flag = 0; flag < 1;) {
//                 otp = await Math.round(Math.random() * 1000000);
//                 if (otp.toString().length == 6) {
//                     flag++;
//                 }
//             }
//             let isAlreadyAssign = await userModel.findOne({ otp: otp });
//             if (isAlreadyAssign?.otp != otp) otpFlag = 0;
//         }
        
//         // Send email with OTP
//         const emailSubject = "Password Reset OTP";
//         const emailText = `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`;
        
//         const emailSent = await sendEmail(data.email, emailSubject, emailText);
        
//         if (emailSent) {
//             await userModel.findOneAndUpdate(body, { otp, otpExpireTime: new Date(new Date().setMinutes(new Date().getMinutes() + 10)) });
//             return res.status(200).json(new apiResponse(200, responseMessage?.customMessage("OTP sent to your email"), { email: data.email }, {}));
//         } else {
//             return res.status(501).json(new apiResponse(501, responseMessage?.errorMail, {}, {}));
//         }
//     } catch (error) {
//         return res
//             .status(500)
//             .json(new apiResponse(500, responseMessage?.internalServerError, {}, error));
//     }
// };

// export const reset_password = async (req: Request, res: Response) => {
//     reqInfo(req)
//     let body = req.body,
//         { email, otp, password } = body;

//     try {
//         // First verify that the user exists and the OTP is valid
//         const user = await userModel.findOne({ 
//             email: email, 
//             isActive: true, 
//             otp: otp,
//             otpExpireTime: { $gt: new Date() }
//         });
        
//         if (!user) {
//             return res.status(400).json(new apiResponse(400, responseMessage?.invalidOTP, {}, {}));
//         }

//         const salt = await bcryptjs.genSaltSync(10)
//         const hashPassword = await bcryptjs.hash(password, salt)
        
//         // Update user with new password and clear OTP
//         let response = await userModel.findOneAndUpdate(
//             { email: email, isActive: true }, 
//             { 
//                 password: hashPassword,
//                 otp: null,
//                 otpExpireTime: null
//             }, 
//             { new: true }
//         )
        
//         if (response) {
//             return res.status(200).json(new apiResponse(200, responseMessage?.resetPasswordSuccess, {}, {}))
//         }
//         else return res.status(501).json(new apiResponse(501, responseMessage?.resetPasswordError, {}, {}))

//     } catch (error) {
//         return res.status(500).json(new apiResponse(500, responseMessage?.internalServerError, {}, error))
//     }
// }