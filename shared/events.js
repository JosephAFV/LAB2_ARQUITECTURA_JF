const {createClient}=require('redis');
function attachEvents(app,name,logger){
 if(!process.env.REDIS_URL)return;
 const publisher=createClient({url:process.env.REDIS_URL});
 const subscriber=publisher.duplicate();
 for(const client of [publisher,subscriber])client.on('error',err=>logger.error({servicio:name,redis:err.message}));
 const ready=Promise.all([publisher.connect(),subscriber.connect()]).then(()=>subscriber.subscribe('rrhh.eventos',message=>{try{const event=JSON.parse(message);if(event.servicio!==name)logger.info({servicio:name,evento_recibido:event});}catch(err){logger.error(err.message);}})).catch(err=>logger.error(err.message));
 app.use((req,res,next)=>{res.on('finish',()=>{if(name==='gateway'||!['POST','PUT','DELETE'].includes(req.method)||res.statusCode>=400)return;void ready.then(()=>{if(publisher.isReady)return publisher.publish('rrhh.eventos',JSON.stringify({servicio:name,metodo:req.method,ruta:req.path,fecha:new Date().toISOString()}));}).catch(err=>logger.error(err.message));});next();});
}
module.exports={attachEvents};
