import appointmentService from "../services/appointmentService.js";
import dayjs from "dayjs";

async function searchDoctor(req, res, next) {
  const search = req.query.search;
  try {
    const result = await appointmentService.searchDoctor(search);

    return res.send({ result });
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function scheduleAppointment(req, res, next) {
  const { day, start_time } = req.body;
  const patient = res.locals.patient;
  const { id } = req.params;

  try {
    const end_time = dayjs()
      .set("hour", start_time.split(":")[0])
      .set("minute", start_time.split(":")[1])
      .set("second", 0)
      .add(59, "minute")
      .format("HH:mm");

    const result = await appointmentService.isAvailable({
      day,
      start_time,
      end_time,
      doctorId: id,
    });

    if (result.length) throw new Error("conflito de horário");

    await appointmentService.scheduleAppointment({
      day,
      start_time,
      end_time,
      patient: patient.id,
      doctorId: id,
    });

    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function getAppointmentByPatient(req, res, next) {
  const patient = res.locals.patient;
  try {
    const result = await appointmentService.getAppointmentByPatient({
      id: patient.id,
    });

    return res.send({ result });
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function getAppointmentByDoctor(req, res, next){
  const doctor = res.locals.doctor

  try {
    const result = await appointmentService.getAppointmentByDoctor({
      id: doctor.id,
    });

    return res.send({ result });
    
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function getAvailability(req, res, next){
  const {id} = req.params
  try {
    const result = await appointmentService.getAvailability({id});

    return res.send({ result });
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function getHistoryByPatient(req, res, next){
  const patient = res.locals.patient
  try {
    const result = await appointmentService.getHistoryByPatient({
      id: patient.id,
    });
  
    return res.send({ result });
  } catch (error) {
    return res.sendStatus(500)
  }  
}

async function getHistoryByDoctor(req, res, next){
  const doctor = res.locals.doctor
  try {
    const result = await appointmentService.getHistoryByDoctor({
      id: doctor.id,
    });
  
    return res.send({ result });
  } catch (error) {
    return res.sendStatus(500)
  }  
}

async function confirmAppointment(req, res, next){
  const {id} = req.params
  const doctor = res.locals.doctor
  try {
    await appointmentService.confirmAppointment({id, doctor_id: doctor.id})

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function deleteAppointment(req, res, next){
  const { id } = req.params
  const doctor = res.locals.doctor
  try {
    await appointmentService.deleteAppointment({id, doctor_id: doctor.id})

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500)
  }
}

export default {
  searchDoctor,
  scheduleAppointment,
  getAppointmentByPatient,
  getAppointmentByDoctor,
  getAvailability,
  getHistoryByPatient,
  getHistoryByDoctor,
  confirmAppointment,
  deleteAppointment
};
