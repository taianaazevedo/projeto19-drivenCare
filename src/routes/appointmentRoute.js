import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import appointmentController from "../controllers/appointmentController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { appointmentSchema } from "../schemas/appointment.js";


const appointmentRoutes = Router()

appointmentRoutes.get("/availability/:id", authMiddleware.authValidationPatient, appointmentController.getAvailability) 
appointmentRoutes.get("/search", authMiddleware.authValidationPatient, appointmentController.searchDoctor) 
appointmentRoutes.post("/:id", authMiddleware.authValidationPatient, validateSchema(appointmentSchema), appointmentController.scheduleAppointment) 
appointmentRoutes.get("/", authMiddleware.authValidationPatient, appointmentController.getAppointmentByPatient) 
appointmentRoutes.get("/history", authMiddleware.authValidationPatient, appointmentController.getHistoryByPatient)
appointmentRoutes.get("/schedule", authMiddleware.authValidationDoctor, appointmentController.getAppointmentByDoctor)
appointmentRoutes.post("/confirm/:id", authMiddleware.authValidationDoctor, appointmentController.confirmAppointment)
appointmentRoutes.delete("/:id", authMiddleware.authValidationDoctor, appointmentController.deleteAppointment) // só para médico (cancelar consulta)
appointmentRoutes.get("/historydoc", authMiddleware.authValidationDoctor, appointmentController.getHistoryByDoctor)


export default appointmentRoutes