import Category from "../models/Category";
import Product from "../models/Product"
import Type from "../models/Type";

export const createProduct = async(req,res) => {
    
    const {name,category,type,price,quantity} = req.body

    const categoryFound = await Category.find({ name: { $in: category } });
    const typesFound = await Type.find({ name: { $in: type } });

    const newProduct = new Product({
        name,
        category: categoryFound.map((category) => category.name),
        type: typesFound.map((type) => type.name),
        price,
        quantity});

    const productSaved = await newProduct.save()

    res.status(201).json(productSaved)
}

export const getProducts = async (req,res) => {
    
    const products = await Product.find();
    
    res.json(products)
}

export const getProductByID = async (req,res) => {

    const product = await Product.findById(req.params.productID)

    res.status(200).json(product)

}

export const updateProductByID = async (req,res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, req.body, {
        new:true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductByID = async (req,res) => {
    
    await Product.findByIdAndDelete(req.params.productID)

    res.status(204).json()
}