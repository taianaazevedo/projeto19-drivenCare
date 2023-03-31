import joi from "joi"

export const appointmentSchema = joi.object({
    day: joi.date().format('DD/MM/YYYY').isoWeekday([1, 2, 3, 4, 5]).min('now').required(),
    time: joi.string()
      .regex(/^(1[0-8]|[9]):[0-5][0-9]$/)
      .greater('9:00')
      .less('19:00')
      .required()
  });