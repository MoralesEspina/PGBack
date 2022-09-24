import Client from "../models/Client";
import Sale from "../models/Sale";
import SaleDetail from "../models/SaleDetail"
import Product from "../models/Product";

export const createSale = async (req, res) => {

    let data = req.body;
    var sale = new Sale();
    sale.id_client = data.id_client;
    sale.id_user = data.id_user;

    sale.save((err, sale_save) =>{
        if (sale_save) {
            let detail = data.detail;
            detail.forEach((element,index) => {
                var saleDetail = new SaleDetail();
                saleDetail.id_product = element.id_product;
                saleDetail.quantity = element.quantity;
                saleDetail.id_sale = sale_save._id;
                saleDetail.save((err,detail_save)=>{
                    console.log(detail_save)
                    if (detail_save) {
                        Product.findById({_id:element.id_product},(err,product_data)=>{
                            if (product_data) {
                                Product.findByIdAndUpdate({_id:product_data._id},{stock: parseInt(product_data.stock) -  parseInt(element.quantity)},(err,product_edit)=>{
                                    res.end();
                                })
                            }else{
                                res.send(err)
                            }
                        })

                    }else{
                        res.send(err)
                    }
                })
            });
        }else{
            res.send(err)
        }
    })
}

export const getSale = async (req, res) => {

    var id = req.params.salesID;

    Sale.findById(id).populate('id_client').populate('id_user').exec((err,data_sale)=>{
        if (data_sale) {
            SaleDetail.find({id_sale:data_sale._id}).populate('id_product').exec({id_sale:id},(err,data_detail)=>{
                if (data_detail) {
                    res.status(200).send(
                        {
                            data : {sale: data_sale,
                                details: data_detail}
                            
                        }
                    )
                }
            })
        }
    });
}

export const getSales = async (req,res) => {

    Sale.find().populate('id_client').populate('id_user').exec((err,data_ventas)=> {
        if (data_ventas) {
            res.status(200).send({ventas:data_ventas});

        }else{
            res.status(404).send({message:'No existe ningún registro de venta'});
        }
    });
}

export const detailSale = async (req,res) => {
    
    var id = req.params.saleID;

    SaleDetail.find({id_sale:id}).populate('id_product').exec((err, data_detail) => {
    if (data_detail) {
        res.status(200).send({details:data_detail});
    }else{
        res.status(404).send({message:'No existe ningún detalle de venta'});
    }
    });
}