import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    id_category: 
        {
            ref: "Category",    
            type: Schema.Types.ObjectId,
        },
    purchase_price: Number,
    sale_price: Number,
    stock: Number
}, {
    timestamps:true,
    versionKey: false
})

export default model('Product', productSchema);