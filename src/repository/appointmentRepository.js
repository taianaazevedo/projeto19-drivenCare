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

export default {
  searchDoctor,
};
