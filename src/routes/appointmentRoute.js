import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import appointmentController from "../controllers/appointmentController.js";
import { validateSchema } from "../middlewares/validateSchemaMiddleware.js";
import { appointmentSchema } from "../schemas/appointment.js";


const appointmentRoutes = Router()

appointmentRoutes.get("/availability/:id", authMiddleware.authValidationPatient) //só para paciente (verificar disponibilidade)
appointmentRoutes.get("/search", authMiddleware.authValidationPatient, appointmentController.searchDoctor) // só para paciente (pesquisar por médicos)
appointmentRoutes.post("/:id", authMiddleware.authValidationPatient, validateSchema(appointmentSchema), appointmentController.scheduleAppointment) //só para o paciente (agendar consulta)
appointmentRoutes.get("/", authMiddleware.authValidationPatient) // só para o paciente (visualizar consulta agendada)
appointmentRoutes.get("/history", authMiddleware.authValidationPatient) //só para paciente (pegar histórico)
appointmentRoutes.get("/", authMiddleware.authValidationDoctor) //só para o médico (visualizar consulta agendada)
appointmentRoutes.patch("/:id", authMiddleware.authValidationDoctor) //só para o médico (confirmar consulta)
appointmentRoutes.delete("/:id", authMiddleware.authValidationDoctor) // só para médico (cancelar consulta)
appointmentRoutes.get("/history", authMiddleware.authValidationDoctor) //só para médico (pegar histórico)


export default appointmentRoutes