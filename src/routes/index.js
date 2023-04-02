import { Router } from "express";
import userRoutes from "./userRoute.js";
import appointmentRoutes from "./appointmentRoute.js";

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/appointment", appointmentRoutes)


export default routes