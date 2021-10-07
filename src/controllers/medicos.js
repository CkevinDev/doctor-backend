const {response,request} = require('express');
const Medico = require('../models/medico');


const getMedicos = async (req = request, res = response) => {
    
    try {

        const medicos =  await Medico.find()
            .populate('usuario','nombre apellido img')
            .populate('hospital','nombre direccion img')

        res.status(200).json({
            ok: true,
            medicos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms:"error inesperado"
        })
    }

}

const crearMedicos = async (req = request, res = response) => {
   
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    })

    try {
        
        const medicoDB = await medico.save()
        
        res.status(200).json({
            ok: true,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms:"error  inesperado"
        })
    }

}

const actualizarMedicos = async (req = request, res = response) => {
    
    res.status(200).json({
        ok: true,
        sms: "actualizar medico"
    })

}

const eliminarMedicos = async (req = request, res = response) => {
    
    res.status(200).json({
        ok: true,
        sms:"borrar medico"
    })

}

module.exports={
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    eliminarMedicos
}