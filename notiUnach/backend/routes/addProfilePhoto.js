const { jsonResponse } = require('../lib/jsonResponse');
const router=require('express').Router();
const db=require('../lib/db');
const multer=require('multer');
const storagePath=require('../lib/path');
const path=require('path');

//Configuración del disco donde se almacenarán las cosas
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,storagePath);
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
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

router.post('/', upload.single('profilePicture'),(req,res)=>{
    //En caso no se suba nada
    if(!req.file){
        return res.status(400).json(jsonResponse(400,{
            error:"No se ha especificado el archivo"
        }));
    }
    
    res.status(200).json(jsonResponse(200,{
        message:"Archivo cargado correctamente",
        filePath:req.file.path
    }));
});

module.exports = router;