const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const mysql = require('mysql2/promise'); // Usar mysql2 para promesas
require('dotenv').config();

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Consulta que se realiza a la base de datos
    const query = `
      SELECT multimedia.archive_path 
      FROM user_profile_picture
      JOIN multimedia ON user_profile_picture.multimedia_id = multimedia.id
      WHERE user_profile_picture.user_id = ? AND user_profile_picture.is_using = TRUE
    `;

    // Se realiza la consulta y se guarda la respuesta
    const [response] = await db.query(query, [userId]);

    // Imprimir la respuesta para verificar su estructura
    console.log(response);

    // Si la respuesta contiene algo, la respuesta tendrá al menos un índice
    if (response.length > 0) {
      return res.status(200).json(jsonResponse(200, {
        profilePicture: response[0].archive_path
      }));
    } else {
      return res.status(404).json(jsonResponse(404, {
        message: "El usuario no tiene registrado ninguna foto de perfil"
      }));
    }
  } catch (error) {
    console.error("Ha ocurrido un error inesperado: " + error);
    return res.status(500).json(jsonResponse(500, {
      error: "Ha ocurrido un error inesperado"
    }));
  }
});

module.exports = router;
