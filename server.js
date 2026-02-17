"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const usersRoutes = require('./src/routes/users');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error al conectar MongoDB:", err));
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use("/users", usersRoutes);
// Rutas base
app.get("/", (req, res) => {
    res.send("Servidor de pruebas de la fase 2 listo");
});
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Servidor de pruebas corriendo en http://localhost:${port}`);
});
