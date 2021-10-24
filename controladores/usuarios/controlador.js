import { getDB } from '../../db/db.js';
import { ObjectId } from 'mongodb';
// import jwt_decode from 'jwt-decode';
import { response } from 'express';


const queryAllUsers = async (callback) => {  //controlador que muestra todos los Usuarios.
const baseDeDatos = getDB();
await baseDeDatos
.collection('users')
.find() //aquí puedo agregar filtros de búsqueda
.limit(50)
.toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('users').insertOne(datosUsuario, callback);
  };

const consultarUsuario = async (id,callback) => { //controlador que muestra un solo Usuario.
    const baseDeDatos = getDB(); 
await baseDeDatos
.collection('users')
.findOne({_id: new ObjectId(id)}, callback);
};

// const consultarOCrearUsuario = async (req,callback) => { //verificar si un usuario ya está registrado o no en la bd.
//   //Obetener los datos del usuario desde el token
//   const token = req.headers.authorization.split('Bearer ')[1];
//   const user = jwt_decode(token)['http://localhost/userData'];
//   console.log(user);
//   //Con el id del usuario verificar si el usuario ya está en la bd o no
//  const baseDeDatos = getDB();
//  await baseDeDatos.collection('users').findOne({_id: new ObjectId(id) }, async (err, response) => {//filtro por ID
//   //si el usuario ya está en la bd---devuelve la info del usuario
//   if(response) {
//     callback(err,response);
//   } else {
//   //si el usuario no está en la bd --- lo crea y devuelve la info
//   user.auth0ID = user._id;
//   delete user._id;
//   user.rol = 'usuario inactivo';
//   await crearUsuario(user, (err, respuesta) => callback(err,user));
//   }
// }); 
//   };


const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const operacion = {
        $set: edicion,
    };

    const baseDeDatos = getDB();
    await baseDeDatos
    .collection('users')
    .findOneAndUpdate(filtroUsuario, operacion, {upsert: true, returnOriginal: true}, callback);
};

const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = { _id: new ObjectId(id) };
    const baseDeDatos = getDB();
    await baseDeDatos.collection('users').deleteOne(filtroUsuario, callback);
  };

export { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario }; //consultarOCrearUsuario}; 