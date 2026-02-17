const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

const auth = (req: Request, res: Response, next: NextFunction)=>{
  const authHeader = req.headers['authorization'];
  if (!authHeader) { 
  throw new AppError("Acceso denegado: token no proporcionado", 401)
  }  
  console.log("JWT_SECRET en auth:", process.env.JWT_SECRET);
  const token = authHeader.split(' ')[1];
  if(!token){ 
  throw new AppError("Acceso denegado: token no proporcionado", 401)
  } 

  try{ 
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded; 
    next(); 
  }catch(err){ 
    throw new AppError("Token inválido o expirado", 401)
  }
} 

export default auth;

