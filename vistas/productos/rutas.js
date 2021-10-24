import Express from 'express';
import { editarProducto, 
    queryAllProducts, 
    crearProducto, 
    eliminarProducto, 
    consultarProductoPorNombre,
consultarProductoPorId } from '../../controladores/productos/controlador.js';

const rutasProducto = Express.Router();

const genericCallback = (res) => (err, result) => {    
    if(err) {
        res.status(err.status).send(err.message)
    } else {
        res.json(result);
    }
};

//GET ALL PRODUCTS
rutasProducto.get('/',(req,res)=>{
    console.log('alguien hizo get en la ruta /productos');    
    queryAllProducts(req.query,genericCallback(res))
})


//CREATE A PRODUCT
rutasProducto.post('/create',(req,res)=>{
    crearProducto(req.body, genericCallback(res));
})


// SEARCH PRODUC BY ID
rutasProducto.get('/:id',(req, res) => {
    console.log('alguien hizo get one product en la ruta /productos');
    consultarProductoPorId(req.params.id, genericCallback(res));
});


//EDIT ELEMENT BY ID
rutasProducto.patch('/edit/:id',(req, res) => {   //
    console.log('alguien hizo patch en la ruta /productos/editar');
    editarProducto(req.params.id, req.body, genericCallback(res));
});

//Delete PRODUCT BY ID
rutasProducto.delete('/delete/:id',(req,res)=>{
    console.log('alguien hizo delete en la ruta /productos/eliminar');
    eliminarProducto(req.params.id, genericCallback(res));
})


export default rutasProducto;