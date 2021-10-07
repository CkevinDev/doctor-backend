const path = require('path')
const fs = require('fs')
const { request, response } = require("express");
const {v4:uuidv4} = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const subirArchivo = async (req= request, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar el tipo 
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok:false,
            sms:"Error de tipo, el tipo no es valido"
        })
    }

    //Validar que exista un archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            sms:"no hay archivos para subir"
        });
    }

    //Processar la imagen
    const file = req.files.imagen;
    
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    //validar la extension
    const extValidas = ['png','jpg','jpeg','gif'];

    if(!extValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            sms:"el formato del archivo no es valido"
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`

    //path para guardar imagen
    const path = `./src/upload/${tipo}/${nombreArchivo}`

    //mover la imagen
    file.mv(path,(err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                sms:"Error al subir la imagen"
            })
        }


        actualizarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            ok:true,
            sms:"Archivo subido",
            nombreArchivo
        });
    });

}

const retornarImagen = (req= request, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../upload/${tipo}/${foto}`);

    //imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../upload/no-img.png`);
        res.sendFile(pathImg);
    }

    
}


module.exports = {
    subirArchivo,
    retornarImagen
}