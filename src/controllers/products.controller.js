import Category from "../models/Category";
import Product from "../models/Product"


export const createProduct = async (req, res) => {
    const { name, id_category, purchase_price, sale_price, stock } = req.body

    const newProduct = new Product({
        name,
        id_category,
        purchase_price,
        sale_price,
        stock
    });

    if (newProduct) {
        const productSaved = await newProduct.save()
        res.status(201).json(productSaved)
    } else {
        res.status(500).json('No se pudo guardar el producto')
    }
}

export const getProducts = async (req, res) => {

    /*const products = await Product.find();

    res.json(products)*/
    
    Product.find().populate('id_category').exec((err,product_list) =>{
        if (err) {
            res.status(500).json({message: 'Error en el servidor'})
        }else{
            if (product_list) {
                res.status(200).json({product:product_list})
            }else{
                res.status(403).json({message: 'No existen Productos'})
            }
        }
    })
}

export const getProductByID = async (req, res) => {

    const product = await Product.findById(req.params.productID)

    res.status(200).json(product)
            
}

export const updateProductByID = async (req, res) => {

    const updatedProduct = await Product.findByIdAndUpdate(req.params.productID, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductByID = async (req, res) => {

    await Product.findByIdAndDelete(req.params.productID)

    res.status(204).json()
}


export const updateInventory = async (req, res) => {
    let id = req.params.productID;
    let data = req.body;

    Product.findById(id, (err, product_data) => {
        if (product_data) {
            Product.findByIdAndUpdate(id, { stock: parseInt(product_data.stock) + parseInt(data.stock) }, (err, product_edit) => {
                if (product_edit) {
                    res.status(200).json({ product: product_edit })
                }
            })
        } else {
            res.status(500).json(err)
        }
    })
}