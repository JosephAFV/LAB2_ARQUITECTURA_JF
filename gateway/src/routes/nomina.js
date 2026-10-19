const proxy=require('./proxy');
module.exports=proxy(process.env.NOMINA_URL||'http://localhost:3002','nomina');
