import mongoose from "mongoose";
import { float } from "webidl-conversions";
const repuestoSchema = new mongoose.Schema({
    
    nombre:{type:String, required:true},
    codigo:{type:String, required: true},
    precio:{type: Number, required: true},
    cantidad:{type:Number, required:true}


})

export const Repuesto = mongoose.model("Repuesto", repuestoSchema)