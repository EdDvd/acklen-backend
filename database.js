const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODBURI,{useNewUrlParser:true,useUnifiedTopology:true, useFindAndModify:false, ssl:true})
.then(
 db=> console.log('conexion exitosa'+process.env.MONGODBURI)
)

.catch(
    err=> console.log('fallo de conexion '+ err)
    )