import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import rateLimit from 'express-rate-limit';

// 🛡️ Protección contra ataques de fuerza bruta
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  message: "Demasiados intentos de inicio de sesión. Intenta más tarde.",
});

// 📌 Middleware de validación y protección
export const loginSecure = [
  loginLimiter, // 🚀 Protección contra fuerza bruta
  body('username')
    .trim()
    .toLowerCase() // Evita duplicados con mayúsculas/minúsculas
    .isLength({ min: 3, max: 30 })
    .withMessage('El nombre de usuario debe tener entre 3 y 30 caracteres.')
    .isAlphanumeric()
    .withMessage('El nombre de usuario solo puede contener caracteres alfanuméricos.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.'),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // 🔍 Buscar usuario (asegurando que el username sea minúsculas)
      const user = await User.findOne({ username: username.toLowerCase() }).exec();

      // 🚀 Respuesta genérica para evitar enumeración de usuarios
      if (!user) {
        return res.status(401).send("Credenciales inválidas");
      }

      // 🔐 Comparar la contraseña de forma segura
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send("Credenciales inválidas");
      }

      // ✅ Autenticación exitosa (aquí puedes generar JWT o sesiones)
      res.send(`Bienvenido, ${user.username}`);
    } catch (err) {
      console.error("❌ Error en el inicio de sesión:", err);
      res.status(500).send("Error interno del servidor");
    }
  },
];