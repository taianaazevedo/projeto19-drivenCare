import appointmentService from "../services/appointmentService.js";
import dayjs from "dayjs";


async function searchDoctor(req, res, next) {
  const search = req.query.search;
  try {
    const result = await appointmentService.searchDoctor(search);

    return res.send({ result });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function scheduleAppointment(req, res, next) {
  const { day, start_time } = req.body;
  const patient = res.locals.patient;
  const { id } = req.params;

  try {
    const end_time = dayjs().set('hour', start_time.split(':')[0]).set('minute', start_time.split(':')[1]).set('second', 0).add(59, 'minute').format('HH:mm');
    
    await appointmentService.scheduleAppointment({
      day,
      start_time,
      end_time,
      patient: patient.id,
      doctorId: id,
    });

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export default {
  searchDoctor,
  scheduleAppointment,
};
