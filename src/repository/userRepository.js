import {db} from "../config/database.js"

async function findPatientByEmail(email){
    return await db.query(`
        SELECT * FROM patients WHERE email = $1
    `, [email])
}

async function findDoctorByEmail(email){
    return await db.query(`
        SELECT * FROM doctors WHERE email = $1
    `, [email])
}

async function createPatient({name, email, password}){
    await db.query(`
        INSERT INTO patients (name, email, password)
        VALUES ($1, $2, $3)
    `, [name, email, password])
}

async function createDoctor({name, email, password, specialty, location}){
    await db.query(`
        INSERT INTO doctors (name, email, password, specialty, location)
        VALUES ($1, $2, $3, $4, $5)
    `, [name, email, password, specialty, location])
}

async function findPatientById(id){
    return await db.query(`
        SELECT * FROM patients WHERE id = $1
    `, [id])

}

async function findDoctorById(id){
    return await db.query(`
        SELECT * FROM doctors WHERE id = $1
    `, [id])
}

export default {
    createDoctor, 
    createPatient, 
    findDoctorByEmail, 
    findPatientByEmail,
    findDoctorById, 
    findPatientById
}