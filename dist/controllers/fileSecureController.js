"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFileSecure = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Directorio base para descargas
const BASE_DIR = path_1.default.join(__dirname, '../../files');
const downloadFileSecure = (req, res) => {
    const fileName = path_1.default.basename(req.query.file); // Extrae solo el nombre del archivo
    const filePath = path_1.default.join(BASE_DIR, fileName);
    // Validar nombre del archivo y extensión permitida
    if (!fileName.match(/^[a-zA-Z0-9_-]+\.pdf$/)) {
        console.warn(`Intento de acceso con nombre de archivo no válido: ${fileName}`);
        return res.status(400).send('Nombre de archivo no válido');
    }
    // Verificar que el archivo exista en el directorio permitido
    if (!fs_1.default.existsSync(filePath)) {
        console.warn(`Archivo no encontrado: ${fileName}`);
        return res.status(404).send('Archivo no encontrado');
    }
    res.download(filePath, (err) => {
        if (err) {
            console.error(`Error al descargar el archivo ${fileName}:`, err);
            res.status(500).send('Error al procesar la descarga');
        }
    });
};
exports.downloadFileSecure = downloadFileSecure;
