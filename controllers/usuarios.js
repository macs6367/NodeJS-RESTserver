const {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {

    const {limite = 10, desde = 0} = req.query;
    const query = {
        estado: true
    }
    const [total, usuarios] = await Promise.all([        
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuarioPost = async (req, res = response) => {

    const {nombre, password, correo, rol} = req.body; 
    const usuario = new Usuario({nombre, password, correo, rol});
        
    //Encryptacion de password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guaradar info en DB
    await usuario.save(); 

    res.json({
        msg: 'Peticion POST',
        usuario
    })
}

const usuarioPut =  async (req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, ...newUsuario} = req.body;
    
    if(password){
        //Encryptacion de password
        const salt = bcryptjs.genSaltSync();
        newUsuario.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, newUsuario);

    res.json({
        usuario
    })
}

const usuarioDelete = async (req, res = response) => {

    const {id} = req.params;

    //Fisicamente se borra
    //const usuario = await Usuario.findByIdAndDelete(id); 

    //Se actualiza el estado 
    const usuario  = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}