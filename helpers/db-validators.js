const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error (`El rol ${rol} no existe en la DB`);
    }
}

const emailExiste = async (correo = '') => {

    //Validar si el correo ya existe
    const existeEmail = await Usuario.findOne({correo}); 

    if(existeEmail){
       throw new Error ('El correo ya existe');
    }
}

const existeID = async (id) => {

    //Validar si el correo ya existe
    const existeID = await Usuario.findById(id); 

    if(!existeID){
       throw new Error ('El ID no existe');
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeID
}