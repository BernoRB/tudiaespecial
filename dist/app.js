"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde .env
dotenv_1.default.config();
const public_1 = __importDefault(require("./routes/public"));
const events_1 = __importDefault(require("./routes/events"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
// Configuración básica
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_session_1.default)({
    name: "tudiaespecial_session",
    secret: process.env.SESSION_SECRET || "dev_secret_change_me",
    sameSite: "lax",
}));
// Mantiene compatibilidad con la estructura original de la landing
// (primero se resuelven estos paths exactos)
app.use("/css", express_1.default.static(path_1.default.join(__dirname, "..", "css")));
app.use("/js", express_1.default.static(path_1.default.join(__dirname, "..", "js")));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "..", "images")));
// Estáticos extra del proyecto (si luego agregamos assets nuevos en /public)
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public"), {
    maxAge: "1d",
}));
// Rutas
app.use("/", public_1.default);
app.use("/", admin_1.default);
app.use("/", events_1.default);
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
exports.default = app;
