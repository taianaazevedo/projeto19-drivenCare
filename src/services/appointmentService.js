import appointmentRepository from "../repository/appointmentRepository.js"

async function searchDoctor(search){
    const { rows, rowCount } = await appointmentRepository.searchDoctor(search)
  
    if(!rowCount) throw new Error ("não encontrado")

    return rows
}

async function scheduleAppointment({day, start_time, end_time, patient, doctorId}){
    await appointmentRepository.scheduleAppointment({day, start_time, end_time, patient, doctorId})
}

export default {
    searchDoctor, 
    scheduleAppointment
}