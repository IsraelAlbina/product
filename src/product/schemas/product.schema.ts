import { Schema } from "mongoose";

export const ProductSchema = new Schema({ //se crea una constante para guardar datos en la BD
    name: String,
    description: String,
    imageURL: String,
    price: Number,
    createdAt:{
        type: Date,
        default: Date.now
    }
});