import express from "express";
import path from "path";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

import publicRouter from "./routes/public";
import eventsRouter from "./routes/events";
import adminRouter from "./routes/admin";

const app = express();

// Configuración básica
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    name: "tudiaespecial_session",
    secret: process.env.SESSION_SECRET || "dev_secret_change_me",
    sameSite: "lax",
  })
);

// Mantiene compatibilidad con la estructura original de la landing
// (primero se resuelven estos paths exactos)
app.use("/css", express.static(path.join(__dirname, "..", "css")));
app.use("/js", express.static(path.join(__dirname, "..", "js")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
// Estáticos extra del proyecto (si luego agregamos assets nuevos en /public)
app.use(
  express.static(path.join(__dirname, "..", "public"), {
    maxAge: "1d",
  })
);

// Rutas
app.use("/", publicRouter);
app.use("/", adminRouter);
app.use("/", eventsRouter);

// Fallback 404 básico
app.use((req, res) => {
  res.status(404).render("errors/404", { url: req.originalUrl });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor TuDiaEspecial escuchando en http://localhost:${PORT}`);
  });
}

export default app;

