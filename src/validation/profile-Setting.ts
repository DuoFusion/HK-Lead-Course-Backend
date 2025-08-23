import joi from 'joi'

export const addEditProfileSettingSchema = joi.object().keys({
   name: joi.string(),
   email: joi.string(),
   phoneNumber: joi.string(),
   whatsappNumber: joi.string(),
   message: joi.string(),
   address: joi.string(),
   profileImage: joi.string(),
   socialMedia: {
      instagram: joi.string(),
      facebook: joi.string(),
      whatsapp: joi.string(),
      LinkdIn: joi.string()
   }
})