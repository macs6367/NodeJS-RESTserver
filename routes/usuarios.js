
const {Router} = require('express');
const {check} = require('express-validator');
const {usuariosGet, usuarioPost, usuarioPut, usuarioDelete} = require('../controllers/usuarios');
const {validarCampos} = require('../middlewares/validar-campos');
const {esRolValido, emailExiste, existeID} = require('../helpers/db-validators');
const router = Router(); 

router.get('/', usuariosGet );

router.post('/', [    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La constraseña debe ser más de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
] ,usuarioPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeID),
    check('rol').custom(esRolValido),
    validarCampos
], usuarioPut);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeID),
    validarCampos
], usuarioDelete);

module.exports = router;  