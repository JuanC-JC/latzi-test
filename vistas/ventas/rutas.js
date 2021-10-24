import Express from 'express';
import { editarVenta, 
    queryAllSales, 
    crearVenta, 
    eliminarVenta, 
    consultarVenta } from '../../controladores/ventas/controlador.js';

const rutasVenta = Express.Router();

const genericCallback = (res) => (err, result) => {
  //función anidada que puede ser reutilizada en todos los modelos, manda al front un error en forma de status o un resultado como archivo json
  console.log(err)      
  if(err) {
            res.status(err.status).send(err.message)
        } else {
            res.json(result);
        }
    };


//las rutas se manejaron de forma dinámica, para poder ejecutar patch y delete necesitamos un id obligatorio para obtener la información del Venta específico.

rutasVenta.route('/ventas').get((req, res) => {
    console.log('alguien hizo get en la ruta /ventas');
    queryAllSales(genericCallback(res));
});

rutasVenta.route('/ventas').post((req,res) =>{ 
  //agregar un nuevo Venta en la bd, con unos campos obligatorios.
    crearVenta(req.body, genericCallback(res));
   
});

rutasVenta.route('/ventas/:id').get((req, res) => {
    console.log('alguien hizo get one user en la ruta /ventas');
    consultarVenta(req.params.id, genericCallback(res));
});


rutasVenta.route('/ventas/:id').patch((req, res) => {   //
    console.log('alguien hizo patch en la ruta /ventas/editar');
    editarVenta(req.params.id, req.body, genericCallback(res));

});

rutasVenta.route('/ventas/:id').delete((req, res) => {
    console.log('alguien hizo delete en la ruta /ventas/eliminar');
    eliminarVenta(req.params.id, genericCallback(res));
});

export default rutasVenta;