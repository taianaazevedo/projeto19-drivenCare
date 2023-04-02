import joi from "joi"


export const appointmentSchema = joi.object({
    day: joi.date().greater('now').required(),
    start_time: joi.string().required()
  });