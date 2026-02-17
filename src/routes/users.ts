import express from "express";
import { body } from "express-validator";

import auth from "../middlewares/auth"
import isAdmin from "../middlewares/isAdmin";

import {
  getUsers,
  register,
  login,
  getProfile,
  getAdminData,
  updateUser,
  deleteUser,
  getUserById
} from "../controllers/usersController";

const router = express.Router();

// Públicas
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("El email no es válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres")
  ],
  register
);

router.post("/login", login);

router.get("/test", (req, res) => {
  res.send("users router OK");
});

// Protegidas
router.get("/", getUsers);
router.get("/:id", auth, isAdmin, getUserById);
router.put("/:id", auth, isAdmin, updateUser);
router.delete("/:id", auth, isAdmin, deleteUser);
router.get("/profile", auth, getProfile);
router.get("/admin", auth, isAdmin, getAdminData);

export default router;

