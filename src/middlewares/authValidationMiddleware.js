import userRepository from "../repository/userRepository.js";
import jwt from "jsonwebtoken";

async function authValidationPatient(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw new Error("não autorizado");

  const parts = authorization.split(" ");
  if(parts.length !== 2) throw new Error("não autorizado");

  const [schema, token] = parts
  if(schema !== "Bearer") throw new Error("não autorizado")

  jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
    try {
        if(error) throw new Error("não autorizado")
        if(decoded.type !== "patient") throw new Error("não autorizado")

        const { rows: [user]} = await userRepository.findPatientById(decoded.userId)
        if(!user) throw new Error("não autorizado")

        res.locals.user = user
    } catch (error) {
        next(error)
        
    }
  })
}

async function authValidationDoctor(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("não autorizado");
  
    const parts = authorization.split(" ");
    if(parts.length !== 2) throw new Error("não autorizado");
  
    const [schema, token] = parts
    if(schema !== "Bearer") throw new Error("não autorizado")
  
    jwt.verify(token, process.env.SECRET_KEY, async (error, decoded) => {
      try {
          if(error) throw new Error("não autorizado")
          if(decoded.type !== "doctor") throw new Error("não autorizado")
  
          const { rows: [user]} = await userRepository.findDoctorById(decoded.userId)
          if(!user) throw new Error("não autorizado")
  
          res.locals.user = user
      } catch (error) {
          next(error)
          
      }
    })
  }
  
export default {
    authValidationPatient,
    authValidationDoctor
}