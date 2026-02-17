import express, { Request, Response } from "express";
import usersRoutes from "./routes/users";
import errorHandler from "./middlewares/errorHandler";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB conectado"))
  .catch((err: Error) =>
    console.error("Error al conectar MongoDB:", err)
  );

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor de pruebas de la fase 2 listo");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
