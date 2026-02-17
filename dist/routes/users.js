"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const usersController_1 = require("../controllers/usersController");
const router = express_1.default.Router();
// Públicas
router.post("/register", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("El nombre es obligatorio"),
    (0, express_validator_1.body)("email").isEmail().withMessage("El email no es válido"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
], usersController_1.register);
router.post("/login", usersController_1.login);
router.get("/test", (req, res) => {
    res.send("users router OK");
});
// Protegidas
router.get("/", usersController_1.getUsers);
router.get("/:id", auth_1.default, isAdmin_1.default, usersController_1.getUserById);
router.put("/:id", auth_1.default, isAdmin_1.default, usersController_1.updateUser);
router.delete("/:id", auth_1.default, isAdmin_1.default, usersController_1.deleteUser);
router.get("/profile", auth_1.default, usersController_1.getProfile);
router.get("/admin", auth_1.default, isAdmin_1.default, usersController_1.getAdminData);
exports.default = router;
