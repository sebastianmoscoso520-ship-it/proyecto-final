import express from 'express';
import{ crearRepuesto, obtenerRepuestos, eliminarRepuesto, actualizarRepuesto} from '../controller/producto.controller.js';

const router = express.Router(); // crea una instancia de una miniaplicacion middleware especial dentro de express
//llamado un Router (enrutador)
//sirve para agrupar logicamente un conjunto de rutas relacionadas en lugar de definir todas
// las rutas en la aplicacion principal. 
// Router es un metodo del modulo Express


router.get('/', obtenerRepuestos);
router.post('/',crearRepuesto);
router.put('/:id', actualizarRepuesto);
router.delete('/:id', eliminarRepuesto)


export default router; // le digo a node.js que el objeto router es lo que otros archivos deben obtener al importarte.
