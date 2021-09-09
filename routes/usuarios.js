//Llamamos la funcion router de express
const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validator');
const { checkRole, checkExistingEmail, checkExistingID } = require('../helpers/db-validators');


const { usuariosGet,
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet );

//Para el routh param, express te lo da en una variable.
//Esto significa que es obligatorio ponerlo. La ruta sin el id ya no existe.
router.put('/:id', [
    check('id','No es un ID de la base de datos').isMongoId(),
    check('id').custom( checkExistingID ),
    validarCampos

], usuariosPut );


//Podemos hacer verificaciones antes de que se llame a la funcion en los controladores.
//En el parámetro del medio ponemos el array con los middlewares para verificar
router.post('/', [
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La constraseña debe tener más de 6 caracteres').isLength({min : 6}),
    check('email', 'El correo ingresado no es valido.').isEmail(),
    //check('role', 'El rol ingresado no es valido.').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( checkRole ), //El argumento del rollback va a la funcion.
    check('email').custom( checkExistingEmail ),
    validarCampos //Nuestro middleware que controla los checkeos
] ,usuariosPost );


router.delete('/:id', [
    check('id','No es un ID de la base de datos').isMongoId(),
    check('id').custom( checkExistingID ),
    validarCampos
] ,usuariosDelete);


module.exports = router;




