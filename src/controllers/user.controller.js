import User from "../models/User";
import Role from "../models/Role";

export const createUser = async (req, res) => {
  try {
    const { username, password, id_rol, name, phoneNumber } = req.body;

    // Creando un Nuevo usuario
    const user = new User({
      username,
      password,
      name,
      phoneNumber,
      id_rol,
    });

    // Encriptando Contraseña
    user.password = await User.encryptPassword(user.password);

    // Guardando el Neuvo Usuario
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      id_rol: savedUser.id_rol,
      name: savedUser.name,
      phoneNumber: savedUser.phoneNumber
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {

  User.find().populate('id_rol').exec((err, user_data) => {
    if (err) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      if (user_data) {
        res.status(200).json({ user: user_data })
      } else {
        res.status(403).json({ message: 'No existen Roles' })
      }
    }
  })

};

export const getUser = async (req, res) => {

  const users = await User.findById(req.params.userID);

  res.status(200).json(users)

};

export const getRols = async (req, res) => {
  console.log("Rols")
  const rols = await Role.find();

  res.json(rols)
}

export const editUser = async (req, res) => {

  var id = req.params.userID;
  var data = req.body;

  if (data.password) {
    data.password = await User.encryptPassword(data.password);
    User.findByIdAndUpdate(id, {
      name: data.name,
      password: data.password,
      username: data.username,
      id_rol: data.id_rol,
      phoneNumber: data.phoneNumber
    }, (err, user_edit) => {
      if (user_edit) {
        res.status(200).send({ user: user_edit })
      } else {
        res.status(500).send({ message: 'El Usuario no se pudo editar' })
      }
    })
  } else {
    User.findByIdAndUpdate(id, {
      name: data.name,
      username: data.username,
      id_rol: data.id_rol,
      phoneNumber: data.phoneNumber
    }, (err, user_edit) => {
      if (user_edit) {
        res.status(200).send({ user: user_edit })
      } else {
        res.status(500).send({ message: 'El Usuario no se pudo editar' })
      }
    })
  }
}

export const deleteUser = async (req, res) => {

  await User.findByIdAndDelete(req.params.userID)

  res.status(204).json()
}
