import Category from "../models/Category";
import Type from "../models/Type";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;


    // Creando Categoria
    const category = new Category({
      name,
    });

    // Guardando Categoria
    const savedCategory = await category.save();

    return res.status(200).json({
      _id: savedCategory._id,
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
