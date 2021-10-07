const {Schema, model} = require('mongoose');

const Medico = Schema({
    nombre: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    cmp:{
        type: Number,
        required: true,
    },
    especialidad:{
        type: String,
        required: true,
    },
    direccion:{
        type: String,
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: 'MEDICO_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref:'Hospital',
        required: true
    }
});

Medico.method('toJSON',function(){
   const {__v,_id, password, google, ...object} = this.toObject();
   object.uid = _id;
   return object;
})


module.exports= model('Medico',Medico);