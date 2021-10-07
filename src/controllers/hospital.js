const { request, response } = require("express");
const Hospital = require("../models/hospital");


const getHospitales = async (req = request, res = response) => {
    
    try {

        const hospitales =  await Hospital.find()
            .populate('usuario','nombre apellido img')

        res.status(200).json({
            ok: true,
            hospitales
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms:"error inesperado"
        })
    }

}

const crearHospitales = async (req = request, res = response) => {
    
    const uid = req.uid;
    const hospital =  new Hospital({
        usuario:uid,
        ...req.body
    });
    

    try {

        const hospitalDB = await hospital.save()

        res.status(200).json({
        ok: true,
        hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.json(500).json({
            ok:false,
            sms:"error inesperado"
        })
    }

}

const actualizarHospitales = async (req = request, res = response) => {
    
    res.status(200).json({
        ok: true,
        sms: "actualizar hospital"
    })

}

const deleteHospitales = async (req = request, res = response) => {
    
    res.status(200).json({
        ok: true,
        sms:"borrar hospital"
    })

}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    deleteHospitales
}