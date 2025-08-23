import joi from 'joi'

export const addEditwebSettingSchema = joi.object().keys({
   name: joi.string(),
   email: joi.string(),
   phoneNumber: joi.number(),
   whatsappNumber: joi.number(),
   whatsappMessage: joi.string(),
   address: joi.string(),
   profileImage: joi.string(),
   socialMedia: {
      instagram: joi.string(),
      facebook: joi.string(),
      whatsapp: joi.string(),
      linkedin: joi.string()
   }
})