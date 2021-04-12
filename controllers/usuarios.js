const {response} = require('express');

const usuarioGet = (req, res = response) => {

    const params = req.query; 

    res.json({
        msg: 'Peticion GET',
        params
    })
}

const usuarioPost = (req, res = response) => {
    
    const body = req.body; 

    res.json({
        msg: 'Peticion POST',
        body
    })
}

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'Peticion PUT',
        id
    })
}

const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'Peticion Delete'
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}