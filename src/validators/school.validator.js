import Joi from "joi";

export const addSchoolSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  address: Joi.string().min(5).max(500).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

export const listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  limit: Joi.number().integer().min(1).max(500).default(100)
});
