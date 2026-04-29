import Joi from "joi";

export const questionValidator = Joi.object({
  question: Joi.string().min(1).required().messages({
    "string.base": "Question must be a string",
    "string.empty": "Question cannot be empty",
    "any.required": "Question is required",
  }),
});