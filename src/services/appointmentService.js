import appointmentRepository from "../repository/appointmentRepository.js"

async function searchDoctor(search){
    const { rows, rowCount } = await appointmentRepository.searchDoctor(search)
  
    if(!rowCount) throw new Error ("não encontrado")

    return rows
}

async function scheduleAppointment({day, start_time, end_time, patient, doctorId}){
    await appointmentRepository.scheduleAppointment({day, start_time, end_time, patient, doctorId})
}

async function isAvailable({day, start_time, end_time, doctorId}){
    const { rows, rowCount } = await appointmentRepository.isAvailable({day, start_time, end_time, doctorId})

    return rows
}

export default {
    searchDoctor, 
    scheduleAppointment,
    isAvailable
}