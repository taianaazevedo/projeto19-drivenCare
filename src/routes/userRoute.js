import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { signInSchema, signUpPatientSchema, singUpDoctorSchema } from "../schemas/user.js";
import userController from "../controllers/userController.js";

const userRoutes = Router ()

userRoutes.post("/signup", validateSchema(signUpPatientSchema), userController.createPatient)
userRoutes.post("/signupdoc", validateSchema(singUpDoctorSchema), userController.createDoctor)
userRoutes.post("/signin", validateSchema(signInSchema), userController.signInPatient )
userRoutes.post("/signindoc", validateSchema(signInSchema), userController.signInDoctor)


export default userRoutes