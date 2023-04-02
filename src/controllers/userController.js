import userService from "../services/userService.js";

async function createPatient(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await userService.createPatient({ name, email, password });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function createDoctor(req, res, next) {
  const { email, name, password, specialty, location } = req.body;
  try {
    await userService.createDoctor({
      name,
      email,
      password,
      specialty,
      location,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function signInPatient(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await userService.signInPatient({ email, password });
    return res.send({ token });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function signInDoctor(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await userService.signInDoctor({ email, password });
    return res.send({ token });
  } catch (error) {
    console.log(error)
    next(error);
  }
}

export default {
  signInDoctor,
  signInPatient,
  createDoctor,
  createPatient,
};
