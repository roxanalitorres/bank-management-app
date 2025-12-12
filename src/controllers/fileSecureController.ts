import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const BASE_DIR = path.join(__dirname, '../../files');

export const downloadFileSecure = (req: Request, res: Response) => {
  try {
    // Validar que se haya proporcionado un archivo
    if (!req.query.file) {
      return res.status(400).json({ error: 'El parámetro "file" es requerido' });
    }

    // Obtener y validar el nombre del archivo
    const fileName = decodeURIComponent(req.query.file as string).trim();

    if (!/^[a-zA-Z0-9_-]+\.pdf$/.test(fileName)) {
      console.warn(`Intento de acceso con nombre de archivo no válido: ${fileName}`);
      return res.status(400).json({ error: 'Nombre de archivo no válido' });
    }

    // Construir la ruta segura del archivo
    const filePath = path.join(BASE_DIR, fileName);

    // Verificar que el archivo existe
    if (!fs.existsSync(filePath)) {
      console.warn(`Archivo no encontrado: ${filePath}`);
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Descargar el archivo de forma segura
    res.download(filePath, (err) => {
      if (err) {
        console.error(`Error al descargar el archivo ${fileName}:`, err);
        if (!res.headersSent) {
          return res.status(500).json({ error: 'Error al procesar la descarga' });
        }
      }
    });
  } catch (error) {
    console.error('Error inesperado en la descarga de archivo:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};