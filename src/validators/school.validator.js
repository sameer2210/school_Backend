import Joi from 'joi';

export const addSchoolSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required(),
  address: Joi.string().trim().min(3).max(255).required(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longitude: Joi.number().min(-180).max(180).optional(),
  city: Joi.string().trim().min(2).max(100).required(),
  state: Joi.string().trim().min(2).max(100).required(),
  contact: Joi.number().integer().positive().required(),
  image: Joi.string().uri().required(),
  email_id: Joi.string().email().required(),
});

export const listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  limit: Joi.number().integer().min(1).max(1000).default(100),
});
