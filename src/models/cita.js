const {Schema, model} = require('mongoose');

const Cita = Schema({
    titulo: {
        type: String,
        required: true,
        default:"Consulta medica"
    },
    descripcion:{
        type: String,
        required: true,
        default:"consulta medica a distancia"
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medico:{
        type: Schema.Types.ObjectId,
        ref:'Medico',
        required: true
    }

});

Cita.method('toJSON',function(){
   const {__v,_id, password, role, google, ...object} = this.toObject();
   object.uid = _id;
   return object;
})


module.exports= model('Cita',Cita);