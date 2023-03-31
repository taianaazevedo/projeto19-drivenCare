import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { signInSchema, signUpSchema, singUpDoctor } from "../schemas/user.js";

const userRoutes = Router ()

userRoutes.post("/signup", validateSchema(signUpSchema))
userRoutes.post("/signin", validateSchema(signInSchema))
userRoutes.post("/singupdoc", validateSchema(singUpDoctor))

export default userRoutes