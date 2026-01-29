const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');


const auth = require('../middlewares/auth'); 
const isAdmin = require('../middlewares/isAdmin');

const {
  getUsers,
  register,
  login,
  getProfile,
  getAdminData,
  updateUser,
  deleteUser,
  getUserById
} = require('../controllers/usersController');

// Públicas
router.post("/register",
    [
        body("name").notEmpty().withMessage("El nombre es obligatorio"),
        // valida que el campo nombre no este vacio
        body("email").isEmail().withMessage("El email no es válido"),
        // valida que el campo email tenga un formato de email válido
        body("password").isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres"),
        // valida que la contraseña tenga al menos 6 caracteres
    ],
    register);


router.get('/test', (req, res) => {
  res.send('users router OK');
});


router.post("/login", login);
router.get("/", getUsers);
router.get('/:id', auth, isAdmin, usersController.getUserById);
router.put("/:id", auth, isAdmin, usersController.updateUser);
router.delete("/:id",auth, isAdmin, usersController.deleteUser);

// Protegidas
router.get("/profile", auth, getProfile);
router.get("/admin", auth, isAdmin, getAdminData);

module.exports = router;
