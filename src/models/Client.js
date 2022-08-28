import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    name: String,
    nit:{
        type: String,
        unique: true
    },
    phoneNumber: String,
    direction: String,
    latitude: String,
    length: String,
    imageHouse: String,
    references: String,

}, {
    timestamps:true,
    versionKey: false
})

export default model('Client', clientSchema);