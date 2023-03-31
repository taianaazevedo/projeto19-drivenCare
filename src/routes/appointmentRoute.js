import { Router } from "express";

const appointmentRoutes = Router()

// appointmentRoutes.get("/availability/:id")
appointmentRoutes.post("/") //só para o paciente
appointmentRoutes.get("/") // só para o paciente
appointmentRoutes.get("/") //só para o médico
appointmentRoutes.patch("/:id") //só para o médico
appointmentRoutes.get("/history") //só para médico
appointmentRoutes.get("/history") //só para paciente

export default appointmentRoutes