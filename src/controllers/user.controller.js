import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {
  try {
    const { username, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // Creando un Nuevo usuario
    const user = new User({
      username,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // Encriptando Contraseña
    user.password = await User.encryptPassword(user.password);

    // Guardando el Neuvo Usuario
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

//export const getUsers = async (req, res) => {};

//export const getUser = async (req, res) => {};