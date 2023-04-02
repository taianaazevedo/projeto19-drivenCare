import joi from "joi"

export const signUpPatientSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),

})

export const singUpDoctorSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
    specialty: joi.string().required(),
    location: joi.string().required()
})


export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

