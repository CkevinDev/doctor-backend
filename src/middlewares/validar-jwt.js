const {response, request} = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req=request, res=response,next) => {

    //LEER TOKEN DE LOS HEADERS
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok:false,
            sms:'Necesita estar authenticado'
        })
    }

    try {

        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            sms:'Token no valido'
        })
    }

}

module.exports={
    validarJWT
}