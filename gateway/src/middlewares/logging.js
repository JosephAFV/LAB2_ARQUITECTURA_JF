const {logger}=require('../../../shared/http');
module.exports=(req,res,next)=>{logger.info({metodo:req.method,ruta:req.path});next();};
