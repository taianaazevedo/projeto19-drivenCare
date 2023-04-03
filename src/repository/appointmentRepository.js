import { db } from "../config/database.js";

async function searchDoctor(search) {
  return await db.query(
    `
    SELECT id, name, specialty, location FROM doctors 
    WHERE LOWER (name) LIKE LOWER ($1) OR LOWER (specialty) LIKE LOWER ($1) OR LOWER (location) LIKE LOWER ($1);
    `,
    [`%${search}%`]
  );
}

async function scheduleAppointment({day, start_time, end_time, patient, doctorId}){

  await db.query(`
    INSERT INTO appointments
    (patient_id, doctor_id, day, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5);
  `, [patient, doctorId, day, start_time, end_time])

}

async function isAvailable({ day, start_time, end_time, doctorId }) {
  return await db.query(`
    SELECT *
    FROM appointments
    WHERE doctor_id = $1
      AND day = $2
      AND (
        (start_time <= $3 AND end_time >= $3)
        OR (start_time <= $4 AND end_time >= $4)
        OR (start_time >= $3 AND end_time <= $4)
      );
  `, [doctorId, day, start_time, end_time]);
}

async function getAppointmentByPatient({id}){
  return await db.query(`
  SELECT appointments.id, appointments.day, appointments.start_time, doctors.name AS doctor_name, doctors.specialty
  FROM appointments
  JOIN doctors ON appointments.doctor_id = doctors.id
  WHERE appointments.patient_id = $1 AND day >= NOW();
  `, [id])
}

async function getAppointmentByDoctor({id}){
  return await db.query(`
  SELECT appointments.id, appointments.day, appointments.start_time, patients.name AS patient_name, doctors.specialty
  FROM appointments
  JOIN patients ON appointments.patient_id = patients.id
  JOIN doctors ON appointments.doctor_id = doctors.id
  WHERE doctors.id = $1 AND day >= NOW();
  `, [id])
}

async function getAvailability({id}){
  return await db.query(`
  SELECT appointments.id, appointments.day, appointments.start_time, doctors.name AS doctor_name, doctors.specialty
  FROM appointments
  JOIN doctors ON appointments.doctor_id = doctors.id
  WHERE appointments.doctor_id = $1 day >= NOW();  
  `, [id])
}

async function getHistoryByPatient({id}){
  return await db.query(`
  SELECT * FROM appointments 
  WHERE patient_id = $1 
  AND day < NOW(); 
  `, [id])
}

async function getHistoryByDoctor({id}){
  return await db.query(`
  SELECT * FROM appointments 
  WHERE doctor_id = $1 
  AND day < NOW(); 
  `, [id])
}

export default {
  searchDoctor,
  scheduleAppointment, 
  isAvailable, 
  getAppointmentByPatient,
  getAppointmentByDoctor,
  getAvailability,
  getHistoryByPatient,
  getHistoryByDoctor
};
