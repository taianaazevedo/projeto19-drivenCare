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
    const { rows } = await appointmentRepository.isAvailable({day, start_time, end_time, doctorId})

    return rows
}

async function getAppointmentByPatient({id}){
    const {rows, rowCount } = await appointmentRepository.getAppointmentByPatient({id})
    if(!rowCount) throw new Error("não há agendamento")

    return rows
}

export default {
    searchDoctor, 
    scheduleAppointment,
    isAvailable,
    getAppointmentByPatient
}