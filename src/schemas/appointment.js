import joi from "joi"


export const appointmentSchema = joi.object({
    day: joi.string().required(),
    start_time: joi.string().required()
  });