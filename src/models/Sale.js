import { Schema, model } from "mongoose";

const saleSchema = new Schema({
    id_client: {type: Schema.ObjectId, ref:'Client'},
    id_user: {type: Schema.ObjectId, ref:'User'},
    date: {type: Date, default: Date.now}
}, {
    timestamps:true,
    versionKey: false
})

export default model('Sale', saleSchema);