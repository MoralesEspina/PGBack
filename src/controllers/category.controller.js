import Category from "../models/Category";
import Type from "../models/Type";

export const createCategory = async (req, res) => {
  try {
    const { name, types } = req.body;

    const typesFound = await Type.find({ name: { $in: types } });

    // Creando un Nuevo usuario
    const category = new Category({
      name,
      types: typesFound.map((type) => type.name),
    });

    // Guardando el Neuvo Usuario
    const savedCategory = await category.save();

    return res.status(200).json({
      _id: savedCategory._id,
      types: savedCategory.types,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async (req,res) => {
    
    const category = await Category.find();

    res.json(category)
}

export const getTypesByID = async (req,res) => {
    
  const category = await Category.find();

  res.json(category)
}
