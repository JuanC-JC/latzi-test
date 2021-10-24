import Express from 'express';
import { editarUsuario, 
    queryAllUsers, 
    crearUsuario, 
    eliminarUsuario, 
    consultarUsuario 
} from '../../controladores/usuarios/controlador.js';

const rutasUsuario = Express.Router();

const genericCallback = (res) => (err, result) => {
  //función anidada que puede ser reutilizada en todos los modelos, manda al front un error en forma de status o un resultado como archivo json
  console.log(err)      
  if(err) {
            res.status(err.status).send(err.message)
        } else {
            res.json(result);
        }
    };


//las rutas se manejaron de forma dinámica, para poder ejecutar patch y delete necesitamos un id obligatorio para obtener la información del Usuario específico.

rutasUsuario.route('/usuarios').get((req, res) => {
    console.log('alguien hizo get en la ruta /usuarios');
    queryAllUsers(genericCallback(res));
});

rutasUsuario.route('/usuarios').post((req,res) =>{ 
  //agregar un nuevo Usuario en la bd, con unos campos obligatorios.
    crearUsuario(req.body, genericCallback(res));
   
});

rutasUsuario.route('/usuarios/self').get((req, res) => {
    console.log('alguien hizo get en la ruta /self');       //ruta self --- donde está la info personal de cada usuario
    consultarOCrearUsuario(req, genericCallback(res));
    //consultarUsuario(req.params.id, genericCallback(res));
});

rutasUsuario.route('/usuarios/:id').get((req, res) => {
    console.log('alguien hizo get one user en la ruta /usuarios');
    consultarUsuario(req.params.id, genericCallback(res));
});


rutasUsuario.route('/usuarios/:id').patch((req, res) => {   //
    console.log('alguien hizo patch en la ruta /usuarios/editar');
    editarUsuario(req.params.id, req.body, genericCallback(res));

});

rutasUsuario.route('/usuarios/:id').delete((req, res) => {
    console.log('alguien hizo delete en la ruta /usuarios/eliminar');
    eliminarUsuario(req.params.id, genericCallback(res));
});

export default rutasUsuario;