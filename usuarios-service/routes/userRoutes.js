const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/', userController.crearUsuario);
router.post('/login', userController.login);
// Ruta para obtener un usuario por ID sin autenticación
// Esto es útil para permitir que los médicos puedan ser validados sin necesidad de autenticación previa
// No se recomienda exponer esta ruta en producción sin medidas de seguridad adecuadas
router.get('/:id', userController.obtenerUsuarioPorId);

router.use(auth);

router.get('/', userController.obtenerUsuarios);
router.put('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;