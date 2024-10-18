const { jsonResponse } = require('../lib/jsonResponse');
const router = require('express').Router();
const db = require('../lib/db');
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    const { name, lastName, password, mail } = req.body;

    if (!name || !mail || !password || !lastName) {
        return res.status(400).json(jsonResponse(400, {
            error: "Los campos son obligatorios"
        }));
    }

    //Creación de usuario
    try {
        //Antes de la inserción necesitamos verificar que el usuario no esté ya registrado
        /**
         * Para saber si el usuario ya existe realizamos
         * una consulta en base al correo, ya que el correo
         * es único para cada usuario
         */
        const checkQuery = `SELECT * FROM User WHERE mail = ?`;
        db.query(checkQuery, [mail], async (err, results) => {
            if (err) {
                console.error('Error al verificar el correo electrónico: ' + err.message);
                return res.status(500).json(jsonResponse(500, {
                    error: 'Error en el proceso de registro'
                }));
            }

            if (results.length > 0) {
                return res.status(400).json(jsonResponse(400, {
                    error: 'El correo ya está registrado'
                }));
            }

            //Hasheo de la password
            const hashedPassword = await bcrypt.hash(password, 10);

            //Query de inserción
            const query = `INSERT INTO User(name,lastName,password,mail) VALUES(?,?,?,?)`;

            //Ejecución del query
            db.query(query, [name, lastName, hashedPassword, mail], (err, results) => {
                //Caso en el que ocurra algún error
                if (err) {
                    console.error('Ha surgido un error al intentar insertar el registro: ' + err.message);
                    return res.status(500).json(jsonResponse(500, {
                        error: 'Error al intentar crear el usuario'
                    }));
                }

                //Caso positivo que sí se hizo la inserción
                res.status(200).json(jsonResponse(200, {
                    message: "Usuario registrado con éxito!!!"
                }));
            });
        });

    } catch (err) {
        console.error('Ha ocurrido un error inesperado');
        res.status(500).json(jsonResponse(500, {
            error: "Error en el proceso de registro"
        }));
    }

});

module.exports = router;  