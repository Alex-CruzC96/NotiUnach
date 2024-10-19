const { jsonResponse } = require('../lib/jsonResponse');
const router=require('express').Router();
const db=require('../lib/db');
const multer=require('multer');
const storagePath=require('../lib/path');
const path=require('path');
const fs = require('fs');

//Configuración del disco donde se almacenarán las cosas
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,storagePath);
    },
    filename:(req,file,cb)=>{
        const filePath=path.join(storagePath,`${req.body.userId}-${file.originalname}`);
        if(fs.existsSync(filePath)){
            return cb(new Error('Archivo ya existente'), filePath);
        }
        else{
            return cb(null, filePath);
        }
    }
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=['image/jpeg','image/jpg','image/png','image/gif'];
    if(!allowedTypes.includes(file.mimetype)){
        const error=new Error('Formato de archivo no permitido');
        error.status=400;
        return cb(error,false);
    }

    cb(null,true);
};

//Se inicializa multer con la configuración de arriba
const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fileSize:1024*1024*5
    }
});

router.post('/', upload.single('profilePicture'), async (req,res)=>{
    //En caso no se suba nada
    if(!req.file){
        return res.status(400).json(jsonResponse(400,{
            error:"No se ha especificado el archivo"
        }));
    }
    if(!req.body.userId){
        return res.status(400).json(jsonResponse(400,{
            error:"No se ha especificado el ID del usuario"
        }));
    }

    //Necesitamos la llave foránea de usuario para saber a quien le pertenece
    const userId=req.body.userId;
    const filePath=req.file.path;
    const fileExtension=path.extname(req.file.originalname).slice(1);


    /**
     * Pasos para la inserción de una foto de perfil:
     * 1.- Insertar la imagen en la tabla multimedia
     *  2.1.-La imagen ya existe o ya fue previamente registrada
     *      2.1.1.-Indicar que la imagen ya existe y simplemente
     *      cambiar el "is_using=true" y se termina el proceso
     *  2.2.-La imagen no existe o no ha sido registrada
     *      2.2.1.-Entonces parasar al paso 2
     * 2.- Verificar si el usuario ya tiene una foto de perfil en uso
     *  2.1.-Si es así entonces
     *      2.1.1.-Actualizar el registro a "is_using=false"
     *  2.2.-Si no es así entonces 
     *      2.2.1.-Pasamos al paso 3
     * 3.-Insertar en la tabla user_profile_picture con las llaves
     * foráneas de usuario y multimedia, además de ingresar "is_using=true"
     */
    try{
        //Verificación si la imagen ya está registrada
        const checkImage= await db.query(
            'SELECT id FROM multimedia WHERE archive_path = ?',
            [filePath]
        );

        let multimediaId;

        //Si esto se cumple, la imagen ya está registrada
        if(checkImage.length > 0){
            multimediaId=checkImage[0].id;
            //Como la imagen ya está registrada, simplemente actualiza el registro
            await db.query(
                'UPDATE user_profile_picture SET is_using=TRUE WHERE user_id=? AND multimedia_id = ?',
                [userId,multimediaId]
            );

            return res.status(200).json(jsonResponse(200,{
                message:"La imagen ya existía y se actualizó el registro a 'en uso'",
                filePath:filePath
            }));
        }

        //Caso en el que la imagen no está registrada
        const result=await db.query(
            'INSERT INTO  multimedia(archive_type,archive_size,archive_path) VALUES(?,?,?)',
            [fileExtension,req.file.size,filePath]
        );
        multimediaId=result.insertId;

        //Verificación de foto de perfil existente del usuario
        await db.query(
            'UPDATE user_profile_picture SET is_using = FALSE WHERE user_id = ? AND is_using = TRUE',
            [userId]
        );

        //Inserción de la nueva foto en la tabla de fotos de perfil
        await db.query(
            'INSERT INTO user_profile_picture(user_id,multimedia_id,is_using) VALUES(?,?,TRUE)',
            [userId,multimediaId]
        );

        //Resultado
        return res.status(200).json(jsonResponse(200,{
            message:"Archivo cargado y guardado con éxito!!!",
            filePath:filePath
        }));
    }
    catch(error){
        console.error('Error al guardar la imagen en la base de datos');
        return res.status(500).json(jsonResponse(500,{
            error:"Error en la base de datos"
        }));
    }
});

module.exports = router;