import jwt from "jsonwebtoken";
import config from '../config'
import User from "../models/User";
import Role from "../models/Role";

export const verifyToken = async (req,res,next) =>{
    try {
        const token = req.headers["x-access-token"];

    if(!token) return res.status(403).json({message: "No ha Proporcionado un Token de Acceso"})

    const decoded = jwt.verify(token,config.SECRET)
    req.userId = decoded.id;

    const user = await User.findById(decoded.id, {password: 0})

    if(!user) return res.status(404).json({message: 'No Existe el Usuario'})

    next()
    } catch (error) {
        return res.status(401).json({message: 'Usuario no autorizado'})
    }   
}

export const isDealer = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.id_rol } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "dealer") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Se Necesita Rol de Repartidor!"});
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  }
  
  export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.id_rol } });
  
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
  
      return res.status(403).json({ message: "Se Necesita Rol de Administrador! "});
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  }

export const isSecret = async (req,res,next) =>{
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.id_rol } });
    
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "secretary") {
            next();
            return;
          }
        }
    
        return res.status(403).json({ message: "Se Necesita Rol de Secretario!" });
      } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error });
      }
}