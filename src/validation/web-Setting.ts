import joi from 'joi'

export const addEditwebSettingSchema = joi.object().keys({
   name: joi.string(),
   email: joi.string(),
   phoneNumber: joi.number(),
   whatsappNumber: joi.number(),
   whatsappMessage: joi.string().allow(null, ''),
   address: joi.string(),
   profileImage: joi.string(),
   socialMedia: {
      instagram: joi.string().allow(null, ''),
      facebook: joi.string().allow(null, ''),
      whatsapp: joi.string().allow(null, ''),
      linkedin: joi.string().allow(null, '')
   }
})