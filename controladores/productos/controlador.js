import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';


const queryAllProducts = async (callback) => {  //controlador que muestra todos los productos.
const baseDeDatos = getDB();
await baseDeDatos
.collection('inventory')
.find({}) //aquí puedo agregar filtros de búsqueda
.toArray(callback);
};

const crearProducto = async (datosProductos, callback) => {
        if (
            Object.keys(datosProductos).includes('product') &&
            Object.keys(datosProductos).includes('mark') &&            //Campos obligatorios que se deben cumplir para poder agregar un nuevo producto
            Object.keys(datosProductos).includes('ServingSizes') &&
            Object.keys(datosProductos).includes('Size') &&
            Object.keys(datosProductos).includes('price')
        ) {

            //código para crear un producto en la bd, colección inventory
            const baseDeDatos = getDB();
            await baseDeDatos.collection('inventory').insertOne(datosProductos, callback);
        } else {
            return 'error';
        }
};

const consultarProducto = async (id,callback) => { //controlador que muestra un solo producto.
    const baseDeDatos = getDB(); 
await baseDeDatos
.collection('inventory')
.findOne({_id: new ObjectId(id)}, callback);
};


const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };

    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('inventory')
    .findOneAndUpdate(filtroProducto, operacion, {upsert: true}, callback);
};

const eliminarProducto = async (id, callback) => {
    const filtroProducto = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('inventory').deleteOne(filtroProducto, callback);
  };

export { queryAllProducts, crearProducto, editarProducto, eliminarProducto, consultarProducto}; 