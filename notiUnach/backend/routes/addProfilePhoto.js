const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const db = require('../lib/db');
const multer = require('multer');
const path = require('path');
const storagePath = require('../lib/path');
const fs = require('fs');

// Middleware para verificar y asignar `userId`
const assignUserId = (req, res, next) => {
    if (!req.query.userId) {
        return res.status(400).json(jsonResponse(400, {
            error: "No se especifica el userId en la URL"
        }));
    }
    req.userId = req.query.userId; // Asigna `userId` a `req`
    next();
};

// Configuración del disco donde se almacenarán las cosas
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        const fileName = `${req.userId}-${file.originalname}`; // Usar `req.userId`
        const filePath = path.join(storagePath, fileName);
        if (fs.existsSync(filePath)) {
            return cb(new Error('Archivo ya existente'), fileName);
        } else {
            return cb(null, fileName);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error('Formato de archivo no permitido');
        error.status = 400;
        return cb(error, false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

router.post('/', assignUserId, upload.single('profilePicture'), async (req, res) => {
    const userId = req.userId; // `req.userId` ya está asignado
    const fileName = `${userId}-${req.file.originalname}`;
    const filePath = req.file.path;
    const relativePath = path.join('localstorage/profilePictures', fileName);
    const fileExtension = path.extname(req.file.originalname).slice(1);

    try {
        // Verificación si la imagen ya está registrada
        const checkImage = await db.query('SELECT id FROM multimedia WHERE archive_path = ?', [relativePath]);
        let multimediaId;
        if (checkImage.length > 0) {
            multimediaId = checkImage[0].id;
            // Como la imagen ya está registrada, simplemente actualiza el registro
            await db.query('UPDATE user_profile_picture SET is_using = TRUE WHERE user_id = ? AND multimedia_id = ?', [userId, multimediaId]);
            return res.status(200).json(jsonResponse(200, {
                message: "La imagen ya existía y se actualizó el registro a 'en uso'",
                filePath: relativePath
            }));
        }

        // Caso en el que la imagen no está registrada
        const result = await db.query('INSERT INTO multimedia (archive_type, archive_size, archive_path) VALUES (?, ?, ?)',
            [fileExtension, req.file.size, relativePath]);

        multimediaId=result.insertId;
        // Verificación de foto de perfil existente del usuario
        await db.query('UPDATE user_profile_picture SET is_using = FALSE WHERE user_id = ? AND is_using = TRUE', [userId]);

        // Inserción de la nueva foto en la tabla de fotos de perfil
        await db.query('INSERT INTO user_profile_picture (user_id, multimedia_id, is_using) VALUES (?, ?, TRUE)', [userId, multimediaId]);

        return res.status(200).json(jsonResponse(200, {
            message: "Archivo cargado y guardado con éxito!!!",
            filePath: relativePath
        }));
    } catch (error) {
        console.error('Error al guardar la imagen en la base de datos:', error);
        return res.status(500).json(jsonResponse(500, {
            error: "Error en la base de datos",
            details: error.message
        }));
    }
});

module.exports = router;
