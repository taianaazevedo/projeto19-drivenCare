import joi from "joi"


export const appointmentSchema = joi.object({
    day: joi.date().required(),
    start_time: joi.string().required()
  });