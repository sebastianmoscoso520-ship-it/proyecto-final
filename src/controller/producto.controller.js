import express from 'express';
import {Repuesto} from '../models/producto.model.js';
const router = express.Router();

//obtener repuestos creados

export const obtenerRepuestos = async (req, res) =>{
try{
    const repuestos = await Repuesto.find();
    if(Repuesto.length === 0){
        return res.status(204).json({
            message: 'No se encontraron repuestos en la base de datos'
        });

    }
    res.json(repuestos)

}catch(error){
    res.status(500).json({
        message: error.message
    })
}


}


//crear repuesto
export const crearRepuesto = async (req, res)=>{
    const {nombre, codigo, precio, cantidad} = req.body;

    if(!nombre|| !codigo|| !precio|| !cantidad){
        return res.status(400).json({
            message: "los campos son obligatorios"
        });
    }

    const nuevoRepuesto = new Repuesto({
        nombre,
        codigo,
        cantidad,
        precio

    });

try {
    const repuestoGuardado = await nuevoRepuesto.save();
    res.status(201).json({
      repuestoGuardado
    })
} catch (error) {
    res.status(400).json({message: error.message})
}


}


//actuallizar repuesto

export const actualizarRepuesto = async(req, res)=>{
try {
    const updatedRepuesto = await Repuesto.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(200).json(updatedRepuesto);
} catch (error) {
    res.status(500).json({message:error.message});
}
};



//eliminar repuesto

export const eliminarRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Repuesto.findByIdAndDelete(id);
    if (!eliminado) {
      return res.status(404).json({ message: 'Repuesto no encontrado' });
    }
    res.json({ message: 'Repuesto eliminado correctamente', eliminado });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
