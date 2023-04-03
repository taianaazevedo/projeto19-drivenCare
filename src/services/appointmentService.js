import appointmentRepository from "../repository/appointmentRepository.js"

async function searchDoctor(search){
    const { rows, rowCount } = await appointmentRepository.searchDoctor(search)
  
    if(!rowCount) throw new Error ("Not found")

    return rows
}

async function scheduleAppointment({day, start_time, end_time, patient, doctorId}){
    await appointmentRepository.scheduleAppointment({day, start_time, end_time, patient, doctorId})
}

async function isAvailable({day, start_time, end_time, doctorId}){
    const { rows } = await appointmentRepository.isAvailable({day, start_time, end_time, doctorId})

    return rows
}

async function getAppointmentByPatient({id}){
    const {rows, rowCount } = await appointmentRepository.getAppointmentByPatient({id})
    if(!rowCount) throw new Error("Appointment not found")

    return rows
}

async function getAppointmentByDoctor({id}){
    const {rows, rowCount } = await appointmentRepository.getAppointmentByDoctor({id})
    if(!rowCount) throw new Error("Appointment not found")

    return rows
}

async function getAvailability({id}){
    const { rows } = await appointmentRepository.getAvailability({id})
    
    return rows
}

async function getHistoryByPatient({id}){
    const { rows } = await appointmentRepository.getHistoryByPatient({id})
    
    return rows
}

async function getHistoryByDoctor({id}){
    const { rows } = await appointmentRepository.getHistoryByDoctor({id})
    
    return rows
}

async function confirmAppointment({id, doctor_id}){
    const {rows: [appointment]} = await appointmentRepository.getAppointmentById({id})
   
    if(appointment.doctor_id !== doctor_id) throw new Error ("Unauthorized")

    await appointmentRepository.confirmAppointment({id})
}

async function deleteAppointment({id, doctor_id}){
    const {rows: [appointment]} = await appointmentRepository.getAppointmentById({id})
   
    if(appointment.doctor_id !== doctor_id)

    if(appointment.doctor_id !== doctor_id) throw new Error ("Unauthorized")

    await appointmentRepository.deleteAppointment({id, doctor_id})
}

export default {
    searchDoctor, 
    scheduleAppointment,
    isAvailable,
    getAppointmentByPatient,
    getAppointmentByDoctor,
    getAvailability,
    getHistoryByPatient,
    getHistoryByDoctor,
    confirmAppointment,
    deleteAppointment
}