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
      )
  `, [doctorId, day, start_time, end_time]);
}

export default {
  searchDoctor,
  scheduleAppointment, 
  isAvailable
};
