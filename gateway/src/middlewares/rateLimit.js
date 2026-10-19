const {rateLimit}=require('express-rate-limit');
module.exports=rateLimit({windowMs:60000,limit:100,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Demasiadas peticiones, intenta en 1 minuto.'}});
