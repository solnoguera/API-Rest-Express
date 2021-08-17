//Llamamos la funcion router de express
const { Router } = require('express');

const { usuariosGet,
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet );
//Para el routh param, express te lo da en una variable.
//Esto significa que es obligatorio ponerlo. La ruta sin el id ya no existe.
router.put('/:id', usuariosPut );

router.post('/', usuariosPost );

router.patch('/', usuariosPatch );

router.delete('/', usuariosDelete);


module.exports = router;




