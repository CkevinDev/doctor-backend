const mongoose = require('mongoose')

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CDN);
        console.log("conexion exitosa");
    } catch (err) {
        console.log("error de conexion", err)
    }
}


module.exports={
    dbconnection
}