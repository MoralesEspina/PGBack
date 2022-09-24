import { Schema, model } from "mongoose";

const sale_detailSchema = new Schema({
    id_product: {type: Schema.ObjectId, ref:'Product'},
    quantity: Number,
    id_sale: {type:Schema.ObjectId, ref:'SaleDetail'}
}, {
    timestamps:true,
    versionKey: false
})

export default model('SaleDetail', sale_detailSchema);