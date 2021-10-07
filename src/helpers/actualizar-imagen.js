const Hospital = require("../models/hospital")
const Medico = require("../models/medico")
const Usuario = require("../models/usuario")
const fs = require('fs')

const borrarImagen = (path) =>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {


let pathViejo='';


    switch (tipo) {
        case "medicos":
            const medico = await Medico.findById(id);
            if(!medico){
                console.log("not found medico whit this id");
                return false
            }

            pathViejo = `./src/upload/medicos/${medico.img}`;
            borrarImagen(pathViejo)

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        case "hospitales":
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log("not found medico whit this id");
                return false
            }

            pathViejo = `./src/upload/hospitales/${hospital.img}`;
            borrarImagen(pathViejo)

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            
        break;
        case "usuarios":
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log("not found medico whit this id");
                return false
            }

            pathViejo = `./src/upload/usuarios/${usuario.img}`;
            borrarImagen(pathViejo)

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
        break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}