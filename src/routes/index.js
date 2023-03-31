import { Router } from "express";
import userRoutes from "./userRoute.js";
import appointmentRoutes from "./appointmentRoute.js";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/appoitment", appointmentRoutes)


export default routes