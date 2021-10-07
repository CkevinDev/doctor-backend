const {Schema, model} = require('mongoose');

const User = Schema({
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
    direccion:{
        type: String,
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    },
});

User.method('toJSON',function(){
   const {__v,_id, password,google,role, ...object} = this.toObject();
   object.uid = _id;
   return object;
})


module.exports= model('User',User);