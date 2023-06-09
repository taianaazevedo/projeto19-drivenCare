import userService from "../services/userService.js";

async function createPatient(req, res, next) {
  const { name, email, password } = req.body;
  try {
    await userService.createPatient({ name, email, password });
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500)
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
    return res.sendStatus(500)
  }
}

async function signInPatient(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await userService.signInPatient({ email, password });
    return res.send({ token });
  } catch (error) {
    return res.sendStatus(500)
  }
}

async function signInDoctor(req, res, next) {
  const { email, password } = req.body;
  try {
    const token = await userService.signInDoctor({ email, password });
    return res.send({ token });
  } catch (error) {
    return res.sendStatus(500)
  }
}

export default {
  signInDoctor,
  signInPatient,
  createDoctor,
  createPatient,
};
