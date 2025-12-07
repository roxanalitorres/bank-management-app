"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { applySecurityMiddleware } from './middlewares/security';
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const forumRoutes_1 = __importDefault(require("./routes/forumRoutes"));
const transferRoutes_1 = __importDefault(require("./routes/transferRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const authRoutes_2 = __importDefault(require("./routes/authRoutes"));
const forumRoutes_2 = __importDefault(require("./routes/forumRoutes"));
const transferRoutes_2 = __importDefault(require("./routes/transferRoutes"));
const fileRoutes_2 = __importDefault(require("./routes/fileRoutes"));
const app = (0, express_1.default)();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/default';
const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || 'vulnerable';
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Error en la conexión a MongoDB:', err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Conexión a MongoDB perdida. Intentando reconectar...');
});
// Middlewares
app.use(body_parser_1.default.json());
// applySecurityMiddleware(app);
// Carga dinámica de rutas según el modo
if (MODE === 'vulnerable') {
    console.log('Servidor iniciado en modo VULNERABLE');
    app.use('/auth', authRoutes_1.default);
    app.use('/forum', forumRoutes_1.default);
    app.use('/transfer', transferRoutes_1.default);
    app.use('/files', fileRoutes_1.default);
}
else if (MODE === 'secure') {
    console.log('Servidor iniciado en modo SEGURO');
    app.use('/auth', authRoutes_2.default);
    app.use('/forum', forumRoutes_2.default);
    app.use('/transfer', transferRoutes_2.default);
    app.use('/files', fileRoutes_2.default);
}
else {
    console.error('Modo inválido. Use "vulnerable" o "secure".');
    process.exit(1); // Salida si el modo no es válido
}
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
