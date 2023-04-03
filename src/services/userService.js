import userRepository from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

async function createPatient({name, email, password}){
    const { rowCount } = await userRepository.findPatientByEmail(email)
    if(rowCount) throw new Error("Email already exists")

    const hashPassword = await bcrypt.hash(password, 10)
    await userRepository.createPatient({name, email, password: hashPassword})
}

async function createDoctor({name, email, password, specialty, location}){
    const { rowCount } = await userRepository.findDoctorByEmail(email)
    if(rowCount) throw new Error("Email already exists")

    const hashPassword = await bcrypt.hash(password, 10)
    await userRepository.createDoctor({name, email, password: hashPassword, specialty, location})
}

async function signInPatient({email, password}){
    const { rowCount, rows: [user]} = await userRepository.findPatientByEmail(email)
    if(!rowCount) throw new Error ("Invalid credencial")

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) throw new Error ("Invalid credencial")

    const token = jwt.sign({userId: user.id, type: "patient"}, process.env.SECRET_KEY, {expiresIn: 86400})

    return token
}

async function signInDoctor({email, password}){
    const { rowCount, rows: [user]} = await userRepository.findDoctorByEmail(email)
    if(!rowCount) throw new Error ("Invalid credencial")

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) throw new Error ("Invalid credencial")

    const token = jwt.sign({userId: user.id, type: "doctor"}, process.env.SECRET_KEY, {expiresIn: 86400})

    return token
    
}

export default {
    createDoctor,
    createPatient,
    signInDoctor,
    signInPatient
}