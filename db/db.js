//Este archivo se encarga de la conexión de la base de datos
import { MongoClient , ObjectId} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const stringConexion = process.env.DATABASE_URL;


const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
    client.connect((err, db)=> { //conectar la base de datos, entrega un error o una bd.
        if(err){
            console.error('Error al conectarse a la base de datos')
            return 'error';
        }
        baseDeDatos = db.db('latiz-db'); //le manda la bd a una variable 
        console.log('conexión exitosa');
        return callback();
    });
};

const getDB = () => {     //obetener la variable baseDeDatos
    return baseDeDatos;
}

export {conectarBD, getDB};