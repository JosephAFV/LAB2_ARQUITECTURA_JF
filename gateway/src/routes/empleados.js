const proxy=require('./proxy');
module.exports=proxy(process.env.EMPLEADOS_URL||'http://localhost:3001','empleados');
