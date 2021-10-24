import Express from 'express';
import { editarProducto, 
    queryAllProducts, 
    crearProducto, 
    eliminarProducto, 
    consultarProductoPorNombre,
consultarProductoPorId } from '../../controladores/productos/controlador.js';

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {
  //función anidada que puede ser reutilizada en todos los modelos, manda al front un error en forma de status o un resultado como archivo json
  console.log(err)      
  if(err) {
            res.status(err.status).send(err.message)
        } else {
            res.json(result);
        }
    };


//las rutas se manejaron de forma dinámica, para poder ejecutar patch y delete necesitamos un id obligatorio para obtener la información del producto específico.

rutasProducto.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    queryAllProducts(genericCallback(res));
});

rutasProducto.route('/productos').post((req,res) =>{ 
  //agregar un nuevo producto en la bd, con unos campos obligatorios.
    crearProducto(req.body, genericCallback(res));
   
});

rutasProducto.route('/productos/:id').get((req, res) => {
    console.log('alguien hizo get one product en la ruta /productos');
    consultarProductoPorId(req.params.id, genericCallback(res));
});

rutasProducto.route('/productos/name').get((req, res) => {
    console.log('alguien hizo get one product en la ruta /productos');
    console.log(URL.parse(req.url))
    // consultarProductoPorNombre(req.query.name, genericCallback(res));
}); //cambiar por product


rutasProducto.route('/productos/:id').patch((req, res) => {   //
    console.log('alguien hizo patch en la ruta /productos/editar');
    editarProducto(req.params.id, req.body, genericCallback(res));

});

rutasProducto.route('/productos/:id').delete((req, res) => {
    console.log('alguien hizo delete en la ruta /productos/eliminar');
    eliminarProducto(req.params.id, genericCallback(res));
});

export default rutasProducto;