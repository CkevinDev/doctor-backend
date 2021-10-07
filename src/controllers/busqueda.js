const { request, response } = require("express");
const Hospital = require("../models/hospital");
const Medico = require("../models/medico");

const getTodo = async (req = request, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i');

    const [medicos, hospitales] = await Promise.all([
        Medico.find({nombre:regex}),
        Hospital.find({nombre:regex})
    ])

    res.json({
        ok:true,
        medicos,
        hospitales
    })
}

const getDocumentoColeccion = async (req = request, res = response) => {

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i');
    let data = []

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre:regex})
                .populate('usuario','nombre img')
                .populate('hospital','nombre direccion img');
            break;
        case 'hospitales':
            data = await Hospital.find({nombre:regex})
                .populate('usuario','nombre img');  
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                sms: 'la coleccion es incorrecta debe ser de tipo: medicos/hospitales'
            })
    }

    res.status(200).json({
        ok:true,
        resultado: data
    })
}

module.exports ={
    getTodo,
    getDocumentoColeccion
}