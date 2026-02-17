"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error al conectar MongoDB:", err));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use("/users", users_1.default);
app.get("/", (req, res) => {
    res.send("Servidor de pruebas de la fase 2 listo");
});
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
