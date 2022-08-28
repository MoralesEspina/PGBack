import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateUsername = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return res.status(400).json({ message: "El Usuario ya Existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `El Rol ${req.body.roles[i]} no Existe`,
        });
      }
    }
  }
  next();
};

export { checkDuplicateUsername, checkRolesExisted };