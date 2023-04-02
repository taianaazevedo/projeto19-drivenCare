import appointmentService from "../services/appointmentService.js";

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

export default {
  searchDoctor,
};
