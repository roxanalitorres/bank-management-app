"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSecure = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const userModel_1 = require("../models/userModel"); // Supongamos que usamos Mongoose
// Seguro: Uso de consultas parametrizadas, bcrypt y validación
exports.loginSecure = [
    // Validación de entradas
    (0, express_validator_1.body)('username')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres.')
        .isAlphanumeric()
        .withMessage('El nombre de usuario solo puede contener caracteres alfanuméricos.'),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres.'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;
        try {
            // Busca al usuario por su nombre de usuario
            const user = yield userModel_1.User.findOne({ username }).exec();
            // Verifica si el usuario existe y la contraseña coincide
            if (user && bcrypt_1.default.compareSync(password, user.password)) {
                res.send(`Bienvenido, ${user.username}`);
            }
            else {
                res.status(401).send('Credenciales inválidas');
            }
        }
        catch (err) {
            console.error('Error en el inicio de sesión:', err);
            res.status(500).send('Error interno del servidor');
        }
    }),
];
