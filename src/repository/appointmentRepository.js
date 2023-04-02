import { db } from "../config/database.js";

async function searchDoctor(search) {
  return await db.query(
    `
    SELECT id, name, specialty, location FROM doctors 
    WHERE LOWER (name) LIKE LOWER ($1) OR LOWER (specialty) LIKE LOWER ($2) OR LOWER (location) LIKE LOWER ($3);
    `,
    [`%${search}%`, `%${search}%`, `%${search}%`]
  );
}

async function scheduleAppointment({day, start_time, end_time, patient, doctorId}){

  await db.query(`
    INSERT INTO appointments
    (patient_id, doctor_id, day, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5)
  `, [patient, doctorId, day, start_time, end_time])

}


export default {
  searchDoctor,
  scheduleAppointment
};
