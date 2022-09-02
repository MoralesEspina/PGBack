import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: String,
    category: [
        {
            ref: "Category",
            type: Schema.Types.String,
        }
        ],
    type:[
        {
            ref: "Type",
            type: Schema.Types.String,
        }
    ],
    price: Number,
    quantity: Number
}, {
    timestamps:true,
    versionKey: false
})

export default model('Product', productSchema);